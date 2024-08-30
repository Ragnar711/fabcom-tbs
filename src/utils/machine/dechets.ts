import { prisma } from '../../prismaClient';

export async function getDechetPareto(ofNumero: string = ''): Promise<{
    paretoDechet: { type: string; quantite: number }[];
}> {
    const dechets = await prisma.dechet.groupBy({
        by: ['Type'],
        where: {
            Of: ofNumero,
        },
        _sum: {
            Quantite: true,
        },
        orderBy: {
            _sum: {
                Quantite: 'desc',
            },
        },
    });

    const paretoDechet = dechets.map((dechet) => ({
        type: dechet.Type,
        quantite: dechet._sum.Quantite ?? 0,
    }));

    return { paretoDechet };
}
