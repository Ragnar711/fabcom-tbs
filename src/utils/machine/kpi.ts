import { prisma } from '../../prismaClient';

export async function getKPIsChart() {
    const historique_phase1 = await prisma.historique_phase1.findMany({
        orderBy: {
            Date: 'desc',
        },
        take: 7,
        select: {
            Date: true,
            TD: true,
            TP: true,
            TQ: true,
            TDech: true,
        },
    });

    const historique_phase2 = await prisma.historique_phase2.findMany({
        orderBy: {
            Date: 'desc',
        },
        take: 7,
        select: {
            Date: true,
            TD: true,
            TP: true,
            TQ: true,
            TDech: true,
        },
    });

    const historique_phase3 = await prisma.historique_phase3.findMany({
        orderBy: {
            Date: 'desc',
        },
        take: 7,
        select: {
            Date: true,
            TD: true,
            TP: true,
            TQ: true,
            TDech: true,
        },
    });

    const historique_phase4 = await prisma.historique_phase4.findMany({
        orderBy: {
            Date: 'desc',
        },
        take: 7,
        select: {
            Date: true,
            TD: true,
            TP: true,
            TQ: true,
            TDech: true,
        },
    });

    const historique = [
        ...historique_phase1,
        ...historique_phase2,
        ...historique_phase3,
        ...historique_phase4,
    ];

    const groupedData: {
        [hour: string]: {
            count: number;
            TD: number;
            TP: number;
            TQ: number;
            TDech: number;
        };
    } = historique.reduce(
        (
            acc: {
                [hour: string]: {
                    count: number;
                    TD: number;
                    TP: number;
                    TQ: number;
                    TDech: number;
                };
            },
            curr
        ) => {
            const hour = curr.Date.toString();
            if (!acc[hour]) {
                acc[hour] = { count: 0, TD: 0, TP: 0, TQ: 0, TDech: 0 };
            }
            acc[hour].count += 1;
            acc[hour].TD += curr.TD;
            acc[hour].TP += curr.TP;
            acc[hour].TQ += curr.TQ;
            acc[hour].TDech += curr.TDech;
            return acc;
        },
        {}
    );

    const historiqueKPIs = Object.keys(groupedData).map((hour) => {
        const data = groupedData[hour];
        return {
            Date: new Date(hour).toISOString().slice(11, 13) + 'h',
            TD: data.TD / data.count,
            TP: data.TP / data.count,
            TQ: data.TQ / data.count,
            TDech: data.TDech / data.count,
            TRS:
                ((data.TP / data.count) *
                    (data.TQ / data.count) *
                    (data.TD / data.count)) /
                10000,
        };
    });

    return historiqueKPIs;
}
