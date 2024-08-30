import { prisma } from '../../prismaClient';

export async function getKPIsChart() {
    const historique = await prisma.historique.findMany({
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
