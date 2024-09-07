import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import {
    differenceInHours,
    differenceInDays,
    differenceInWeeks,
    differenceInMonths,
} from 'date-fns';
import { secondsBetweenDates } from '../utils/utils';

interface GroupedData {
    [key: string]: {
        TRS: number;
        TP: number;
        TD: number;
        TQ: number;
        NOF: string | null;
        count: number;
    };
}

interface ArretData {
    Motif: string;
    Durée: number;
}

interface NCData {
    Motif: string;
    Quantité: number;
}

interface DechetData {
    Motif: string;
    Quantité: number;
}

export const management = async (req: Request, res: Response) => {
    const { from, to } = req.params;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const diffHours = differenceInHours(toDate, fromDate);
    const diffDays = differenceInDays(toDate, fromDate);
    const diffWeeks = differenceInWeeks(toDate, fromDate);
    const diffMonths = differenceInMonths(toDate, fromDate);

    let groupBy: 'hour' | 'day' | 'week' | 'month' | 'year';

    if (diffHours < 24) {
        groupBy = 'hour';
    } else if (diffDays <= 7) {
        groupBy = 'day';
    } else if (diffWeeks <= 4) {
        groupBy = 'week';
    } else if (diffMonths <= 12) {
        groupBy = 'month';
    } else {
        groupBy = 'year';
    }

    const [
        historique_phase1,
        historique_phase2,
        historique_phase3,
        historique_phase4,
        arret_phase1,
        arret_phase2,
        arret_phase3,
        arret_phase4,
        nonConforme_phase1,
        nonConforme_phase2,
        nonConforme_phase3,
        nonConforme_phase4,
        dechet_phase1,
        dechet_phase2,
        dechet_phase3,
        dechet_phase4,
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
        prisma.arret_phase1.findMany({
            where: { Date_Debut: { gte: from, lte: to } },
            orderBy: { Date_Debut: 'desc' },
        }),
        prisma.arret_phase2.findMany({
            where: { Date_Debut: { gte: from, lte: to } },
            orderBy: { Date_Debut: 'desc' },
        }),
        prisma.arret_phase3.findMany({
            where: { Date_Debut: { gte: from, lte: to } },
            orderBy: { Date_Debut: 'desc' },
        }),
        prisma.arret_phase4.findMany({
            where: { Date_Debut: { gte: from, lte: to } },
            orderBy: { Date_Debut: 'desc' },
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
        prisma.dechet_phase1.findMany({
            where: { Date: { gte: from, lte: to } },
            orderBy: { Date: 'desc' },
        }),
        prisma.dechet_phase2.findMany({
            where: { Date: { gte: from, lte: to } },
            orderBy: { Date: 'desc' },
        }),
        prisma.dechet_phase3.findMany({
            where: { Date: { gte: from, lte: to } },
            orderBy: { Date: 'desc' },
        }),
        prisma.dechet_phase4.findMany({
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

    const arret = [
        ...arret_phase1,
        ...arret_phase2,
        ...arret_phase3,
        ...arret_phase4,
    ];

    const nc = [
        ...nonConforme_phase1,
        ...nonConforme_phase2,
        ...nonConforme_phase3,
        ...nonConforme_phase4,
    ];

    const dechet = [
        ...dechet_phase1,
        ...dechet_phase2,
        ...dechet_phase3,
        ...dechet_phase4,
    ];

    const arretDataMap: { [key: string]: number } = {};
    const ncDataMap: { [key: string]: number } = {};
    const dechetDataMap: { [key: string]: number } = {};

    arret.forEach((item) => {
        const Durée = secondsBetweenDates(
            item.Date_Debut,
            item.Date_Fin ?? new Date()
        );
        const Motif = item.Cause ?? '';

        if (!arretDataMap[Motif]) {
            arretDataMap[Motif] = 0;
        }

        arretDataMap[Motif] += Durée;
    });

    nc.forEach((item) => {
        const Quantité = item.Quantite;
        const Motif = item.Type ?? '';

        if (!ncDataMap[Motif]) {
            ncDataMap[Motif] = 0;
        }

        ncDataMap[Motif] += Quantité;
    });

    dechet.forEach((item) => {
        const Quantité = item.Quantite;
        const Motif = item.Type ?? '';

        if (!dechetDataMap[Motif]) {
            dechetDataMap[Motif] = 0;
        }

        dechetDataMap[Motif] += Quantité;
    });

    const arretData: ArretData[] = Object.entries(arretDataMap).map(
        ([Motif, Durée]) => ({ Motif, Durée })
    );

    const ncData: NCData[] = Object.entries(ncDataMap).map(
        ([Motif, Quantité]) => ({ Motif, Quantité })
    );

    const dechetData: DechetData[] = Object.entries(dechetDataMap).map(
        ([Motif, Quantité]) => ({ Motif, Quantité })
    );

    const sortedArretData = arretData.sort((a, b) => b.Durée - a.Durée);
    const sortedNcData = ncData.sort((a, b) => b.Quantité - a.Quantité);
    const sortedDechetData = dechetData.sort((a, b) => b.Quantité - a.Quantité);

    const groupedData: GroupedData = historique.reduce(
        (acc: GroupedData, row) => {
            let key: string;
            const date = row.Date;

            if (groupBy === 'hour') {
                key = `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(2, '0')}-${String(date.getDate()).padStart(
                    2,
                    '0'
                )} ${String(date.getHours()).padStart(2, '0')}:00`;
            } else if (groupBy === 'day') {
                key = `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            } else if (groupBy === 'week') {
                const week = Math.ceil(date.getDate() / 7);
                key = `${date.getFullYear()}-W${String(week).padStart(2, '0')}`;
            } else if (groupBy === 'month') {
                key = `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(2, '0')}`;
            } else {
                key = `${date.getFullYear()}`;
            }

            if (!acc[key]) {
                acc[key] = {
                    TRS: 0,
                    TP: 0,
                    TQ: 0,
                    TD: 0,
                    NOF: null,
                    count: 0,
                };
            }

            acc[key].TD += row.TD;
            acc[key].TP += row.TP;
            acc[key].TQ += row.TQ;
            acc[key].NOF = row.Of;
            acc[key].count += 1;

            return acc;
        },
        {}
    );

    const result = Object.entries(groupedData).map(([key, value]) => ({
        Date: key,
        NOF: value.NOF,
        TD: value.TD / value.count,
        TP: value.TP / value.count,
        TQ: value.TQ / value.count,
        TRS:
            ((value.TD / value.count) *
                (value.TP / value.count) *
                (value.TQ / value.count)) /
            10000,
    }));

    const data = {
        kpi: result,
        arret: { chart: sortedArretData },
        nc: { chart: sortedNcData },
        dechet: { chart: sortedDechetData },
    };

    res.json(data);
};
