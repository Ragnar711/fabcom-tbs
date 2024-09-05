import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { getParetoArret } from '../utils/machine/arret';
import { getDechetPareto } from '../utils/machine/dechets';
import { getKPIsChart } from '../utils/machine/kpi';
import {
    getMostRecentArret,
    getMostRecentQt,
    secondsBetweenDates,
} from '../utils/utils';

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

type MachineData = {
    KPIs: {
        TD: number;
        TP: number;
        TQ: number;
        TR: number;
        TDech: number;
        TRS: number;
    };
    OF: {
        NOF: string;
        Article: string;
        QO: number;
        QP: number;
        QD: number;
    };
    NC: {
        QNC1: number;
        QNC2: number;
        QNC3: number;
        QNC4: number;
    };
    paretoDechet: { name: string; uv: number }[];
    paretoArret: { name: string; uv: number }[];
    historiqueKPIs: {
        Date: string;
        TD: number;
        TP: number;
        TQ: number;
        TDech: number;
        TRS: number;
    }[];
    lastDechet: {
        cause: string;
        quantite: number;
    };
    lastNC: {
        cause: string;
        quantite: number;
    };
    lastArret: {
        cause: string;
        duree: number;
    };
    historique: {
        Date: string;
        NOF: string | null;
        TRS: number;
        QP: number;
        QNC: number;
    }[];
};

export const machine = async (req: Request, res: Response) => {
    try {
        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
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
                take: 24,
            }),
            prisma.historique_phase2.findMany({
                orderBy: { Date: 'desc' },
                take: 24,
            }),
            prisma.historique_phase3.findMany({
                orderBy: { Date: 'desc' },
                take: 24,
            }),
            prisma.historique_phase4.findMany({
                orderBy: { Date: 'desc' },
                take: 24,
            }),
            prisma.nonConforme_phase1.findMany({
                where: { Date: { gte: last24Hours } },
                orderBy: { Date: 'desc' },
            }),
            prisma.nonConforme_phase2.findMany({
                where: { Date: { gte: last24Hours } },
                orderBy: { Date: 'desc' },
            }),
            prisma.nonConforme_phase3.findMany({
                where: { Date: { gte: last24Hours } },
                orderBy: { Date: 'desc' },
            }),
            prisma.nonConforme_phase4.findMany({
                where: { Date: { gte: last24Hours } },
                orderBy: { Date: 'desc' },
            }),
        ]);

        const of = await prisma.ordreFabrication.findFirst({
            where: { Of_Prod: true },
        });

        const TRS =
            ((((historique_phase1[0]?.TD ?? 0) +
                (historique_phase2[0]?.TD ?? 0) +
                (historique_phase3[0]?.TD ?? 0) +
                (historique_phase4[0]?.TD ?? 0)) /
                4) *
                ((((historique_phase1[0]?.TP ?? 0) +
                    (historique_phase2[0]?.TP ?? 0) +
                    (historique_phase3[0]?.TP ?? 0) +
                    (historique_phase4[0]?.TP ?? 0)) /
                    4) *
                    (((historique_phase1[0]?.TQ ?? 0) +
                        (historique_phase2[0]?.TQ ?? 0) +
                        (historique_phase3[0]?.TQ ?? 0) +
                        (historique_phase4[0]?.TQ ?? 0)) /
                        4))) /
            10000;

        const QP =
            historique_phase4[0]?.Of === of?.Numero
                ? historique_phase4[0]?.QP
                : 0;

        const [QD_phase1, QD_phase2, QD_phase3, QD_phase4] = await Promise.all([
            prisma.dechet_phase1.aggregate({
                _sum: { Quantite: true },
                where: { Of: of?.Numero },
            }),
            prisma.dechet_phase2.aggregate({
                _sum: { Quantite: true },
                where: { Of: of?.Numero },
            }),
            prisma.dechet_phase3.aggregate({
                _sum: { Quantite: true },
                where: { Of: of?.Numero },
            }),
            prisma.dechet_phase4.aggregate({
                _sum: { Quantite: true },
                where: { Of: of?.Numero },
            }),
        ]);

        const totalQuantity =
            (QD_phase1._sum.Quantite ?? 0) +
            (QD_phase2._sum.Quantite ?? 0) +
            (QD_phase3._sum.Quantite ?? 0) +
            (QD_phase4._sum.Quantite ?? 0);

        const { paretoDechet } = await getDechetPareto(of?.Numero);
        const [
            lastDechet_phase1,
            lastDechet_phase2,
            lastDechet_phase3,
            lastDechet_phase4,
        ] = await Promise.all([
            prisma.dechet_phase1.findFirst({
                orderBy: { Date: 'desc' },
                select: { Date: true, Type: true, Quantite: true },
            }),
            prisma.dechet_phase2.findFirst({
                orderBy: { Date: 'desc' },
                select: { Date: true, Type: true, Quantite: true },
            }),
            prisma.dechet_phase3.findFirst({
                orderBy: { Date: 'desc' },
                select: { Date: true, Type: true, Quantite: true },
            }),
            prisma.dechet_phase4.findFirst({
                orderBy: { Date: 'desc' },
                select: { Date: true, Type: true, Quantite: true },
            }),
        ]);

        const lastDechet = getMostRecentQt(
            lastDechet_phase1,
            lastDechet_phase2,
            lastDechet_phase3,
            lastDechet_phase4
        );

        const [lastNC_phase1, lastNC_phase2, lastNC_phase3, lastNC_phase4] =
            await Promise.all([
                prisma.nonConforme_phase1.findFirst({
                    orderBy: { Date: 'desc' },
                    select: { Date: true, Type: true, Quantite: true },
                }),
                prisma.nonConforme_phase2.findFirst({
                    orderBy: { Date: 'desc' },
                    select: { Date: true, Type: true, Quantite: true },
                }),
                prisma.nonConforme_phase3.findFirst({
                    orderBy: { Date: 'desc' },
                    select: { Date: true, Type: true, Quantite: true },
                }),
                prisma.nonConforme_phase4.findFirst({
                    orderBy: { Date: 'desc' },
                    select: { Date: true, Type: true, Quantite: true },
                }),
            ]);

        const lastNC = getMostRecentQt(
            lastNC_phase1,
            lastNC_phase2,
            lastNC_phase3,
            lastNC_phase4
        );

        const [
            lastArret_phase1,
            lastArret_phase2,
            lastArret_phase3,
            lastArret_phase4,
        ] = await Promise.all([
            prisma.arret_phase1.findFirst({
                orderBy: { Date_Debut: 'desc' },
                select: { Date_Debut: true, Date_Fin: true, Cause: true },
            }),
            prisma.arret_phase2.findFirst({
                orderBy: { Date_Debut: 'desc' },
                select: { Date_Debut: true, Date_Fin: true, Cause: true },
            }),
            prisma.arret_phase3.findFirst({
                orderBy: { Date_Debut: 'desc' },
                select: { Date_Debut: true, Date_Fin: true, Cause: true },
            }),
            prisma.arret_phase4.findFirst({
                orderBy: { Date_Debut: 'desc' },
                select: { Date_Debut: true, Date_Fin: true, Cause: true },
            }),
        ]);

        const lastArret = getMostRecentArret(
            lastArret_phase1,
            lastArret_phase2,
            lastArret_phase3,
            lastArret_phase4
        );

        const [QNC1, QNC2, QNC3, QNC4] = await Promise.all([
            prisma.nonConforme_phase1.aggregate({
                _sum: { Quantite: true },
                where: { Of: of?.Numero },
            }),
            prisma.nonConforme_phase2.aggregate({
                _sum: { Quantite: true },
                where: { Of: of?.Numero },
            }),
            prisma.nonConforme_phase3.aggregate({
                _sum: { Quantite: true },
                where: { Of: of?.Numero },
            }),
            prisma.nonConforme_phase4.aggregate({
                _sum: { Quantite: true },
                where: { Of: of?.Numero },
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

        const result = Object.entries(groupedData).map(([key, value]) => ({
            Date: key,
            NOF: value.NOF,
            QP: value.QP - value.QNC - value.QD,
            TRS:
                ((value.TD / value.count) *
                    (value.TP / value.count) *
                    (value.TQ / value.count)) /
                10000,
            QNC: value.QNC ?? 0,
        }));

        const data: MachineData = {
            KPIs: {
                TD:
                    ((historique_phase1[0]?.TD ?? 0) +
                        (historique_phase2[0]?.TD ?? 0) +
                        (historique_phase3[0]?.TD ?? 0) +
                        (historique_phase4[0]?.TD ?? 0)) /
                    4,
                TP:
                    ((historique_phase1[0]?.TP ?? 0) +
                        (historique_phase2[0]?.TP ?? 0) +
                        (historique_phase3[0]?.TP ?? 0) +
                        (historique_phase4[0]?.TP ?? 0)) /
                    4,
                TQ:
                    ((historique_phase1[0]?.TQ ?? 0) +
                        (historique_phase2[0]?.TQ ?? 0) +
                        (historique_phase3[0]?.TQ ?? 0) +
                        (historique_phase4[0]?.TQ ?? 0)) /
                    4,
                TR:
                    ((historique_phase1[0]?.TR ?? 0) +
                        (historique_phase2[0]?.TR ?? 0) +
                        (historique_phase3[0]?.TR ?? 0) +
                        (historique_phase4[0]?.TR ?? 0)) /
                    4,
                TDech:
                    ((historique_phase1[0]?.TDech ?? 0) +
                        (historique_phase2[0]?.TDech ?? 0) +
                        (historique_phase3[0]?.TDech ?? 0) +
                        (historique_phase4[0]?.TDech ?? 0)) /
                    4,
                TRS,
            },
            OF: {
                NOF: of?.Numero ?? "Pas d'OF en cours",
                Article: of?.Article ?? '-',
                QO: of?.Quantite_Objectif ?? 0,
                QP: QP ?? 0,
                QD: totalQuantity ?? 0,
            },
            NC: {
                QNC1: QNC1._sum.Quantite ?? 0,
                QNC2: QNC2._sum.Quantite ?? 0,
                QNC3: QNC3._sum.Quantite ?? 0,
                QNC4: QNC4._sum.Quantite ?? 0,
            },
            paretoDechet,
            paretoArret: await getParetoArret(),
            historiqueKPIs: await getKPIsChart(),
            lastDechet: {
                cause: lastDechet?.Type ?? '-',
                quantite: lastDechet?.Quantite ?? 0,
            },
            lastNC: {
                cause: lastNC?.Type ?? '-',
                quantite: lastNC?.Quantite ?? 0,
            },
            lastArret: {
                cause: lastArret?.Cause ?? '-',
                duree: secondsBetweenDates(
                    lastArret?.Date_Debut ?? new Date(),
                    lastArret?.Date_Fin ?? new Date()
                ),
            },
            historique: result,
        };

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching machine data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
