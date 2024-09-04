import { prisma } from '../../prismaClient';

export async function getKPIsChart() {
    const historique = [];

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
            TR: true,
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
            TR: true,
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
            TR: true,
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
            TR: true,
            TDech: true,
        },
    });

    historique.push(
        ...historique_phase1,
        ...historique_phase2,
        ...historique_phase3,
        ...historique_phase4
    );

    const result = historique.map((entry) => ({
        Date: entry.Date.toISOString().slice(11, 13) + 'h',
        TDech: entry.TDech,
        TP: entry.TP,
        TQ: entry.TQ,
        TD: entry.TD,
        TRS: (entry.TQ * entry.TP * entry.TD) / 10000,
    }));

    return result;
}
