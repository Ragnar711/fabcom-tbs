import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import {
    differenceInHours,
    differenceInDays,
    differenceInWeeks,
    differenceInMonths,
} from 'date-fns';

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
    ]);

    const historique = [
        ...historique_phase1,
        ...historique_phase2,
        ...historique_phase3,
        ...historique_phase4,
    ];

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

    const data = { kpi: result };

    res.json(data);
};
