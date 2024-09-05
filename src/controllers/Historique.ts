import { Request, Response } from 'express';
import { prisma } from '../prismaClient';

interface GroupedData {
    [key: string]: {
        TRS: number;
        TP: number;
        TD: number;
        TQ: number;
        QP: number;
        QNC: number;
        QD: number;
        NOF: string | null;
        count: number;
    };
}

type historiqueData = {
    key: number;
    'Post/heure': string;
    'N°OF': string | null;
    TRS: number;
    'Qté Prod OK': number;
    'Qté NC': number;
    Arrêts: string;
    'Ref. Plaque': string;
    'Cons. Plaque': number;
    'Ref. Enveloppe': string;
    'Cons. Enveloppe': number;
    'Ref. Bac': string;
    'Cons. Bac': number;
    'Ref. Couvercle': string;
    'Cons. Couvercle': number;
}[];

export const historique = async (req: Request, res: Response) => {
    try {
        const { from, to } = req.params;

        const [
            historique_phase1,
            historique_phase2,
            historique_phase3,
            historique_phase4,
            nonConforme_phase1,
            nonConforme_phase2,
            nonConforme_phase3,
            nonConforme_phase4,
        ] = await Promise.all([
            prisma.historique_phase1.findMany({
                orderBy: { Date: 'desc' },
                where: { Date: { gte: from, lte: to } },
            }),
            prisma.historique_phase2.findMany({
                orderBy: { Date: 'desc' },
                where: { Date: { gte: from, lte: to } },
            }),
            prisma.historique_phase3.findMany({
                orderBy: { Date: 'desc' },
                where: { Date: { gte: from, lte: to } },
            }),
            prisma.historique_phase4.findMany({
                orderBy: { Date: 'desc' },
                where: { Date: { gte: from, lte: to } },
            }),
            prisma.nonConforme_phase1.findMany({
                where: { Date: { gte: from, lte: to } },
                orderBy: { Date: 'desc' },
            }),
            prisma.nonConforme_phase2.findMany({
                where: { Date: { gte: from, lte: to } },
                orderBy: { Date: 'desc' },
            }),
            prisma.nonConforme_phase3.findMany({
                where: { Date: { gte: from, lte: to } },
                orderBy: { Date: 'desc' },
            }),
            prisma.nonConforme_phase4.findMany({
                where: { Date: { gte: from, lte: to } },
                orderBy: { Date: 'desc' },
            }),
        ]);

        const historique = [
            ...historique_phase1,
            ...historique_phase2,
            ...historique_phase3,
            ...historique_phase4,
        ];

        const nonConforme = [
            ...nonConforme_phase1,
            ...nonConforme_phase2,
            ...nonConforme_phase3,
            ...nonConforme_phase4,
        ];

        const groupedData: GroupedData = historique.reduce(
            (acc: GroupedData, row) => {
                const hour = row.Date.getHours();
                const key = `${row.Poste} / ${hour}h`;

                if (!acc[key]) {
                    acc[key] = {
                        TRS: 0,
                        TP: 0,
                        TQ: 0,
                        TD: 0,
                        QP: 0,
                        QNC: 0,
                        QD: 0,
                        NOF: '',
                        count: 0,
                    };
                }

                acc[key].TD += row.TD;
                acc[key].TP += row.TP;
                acc[key].TQ += row.TQ;
                acc[key].count += 1;
                acc[key].NOF = row.Of;
                acc[key].QP += historique_phase1[0]?.QP ?? 0;
                acc[key].QD += (historique_phase1[0]?.QP * row.TDech) / 100;

                return acc;
            },
            {}
        );

        const nonConformeGrouped: { [key: string]: number } =
            nonConforme.reduce((acc: { [key: string]: number }, row) => {
                const key = `${row.Poste} / ${row.Date.getHours()}h`;

                if (!acc[key]) {
                    acc[key] = 0;
                }

                acc[key] += row.Quantite;
                return acc;
            }, {});

        Object.entries(nonConformeGrouped).forEach(([key, value]) => {
            if (groupedData[key]) {
                groupedData[key].QNC += value;
            }
        });

        const result = Object.entries(groupedData).map(
            ([key, value], index) => ({
                key: index + 1,
                'Post/heure': key,
                'N°OF': value.NOF,
                'Qté Prod OK': value.QP - value.QNC - value.QD,
                TRS:
                    ((value.TD / value.count) *
                        (value.TP / value.count) *
                        (value.TQ / value.count)) /
                    10000,
                'Qté NC': value.QNC ?? 0,
                Arrêts: '00:00:00',
                'Ref. Plaque': '-',
                'Cons. Plaque': 0,
                'Ref. Enveloppe': '-',
                'Cons. Enveloppe': 0,
                'Ref. Bac': '-',
                'Cons. Bac': 0,
                'Ref. Couvercle': '-',
                'Cons. Couvercle': 0,
            })
        );

        const data: historiqueData = result;

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching machine data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
