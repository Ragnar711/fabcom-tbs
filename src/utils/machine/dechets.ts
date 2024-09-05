import { prisma } from '../../prismaClient';

export async function getDechetPareto(ofNumero: string = ''): Promise<{
    paretoDechet: { name: string; uv: number }[];
}> {
    const dechets = [];
    const dechet_phase1 = await prisma.dechet_phase1.groupBy({
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

    const dechet_phase2 = await prisma.dechet_phase2.groupBy({
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

    const dechet_phase3 = await prisma.dechet_phase3.groupBy({
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

    const dechet_phase4 = await prisma.dechet_phase4.groupBy({
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

    dechets.push(
        ...dechet_phase1,
        ...dechet_phase2,
        ...dechet_phase3,
        ...dechet_phase4
    );

    const dechetMap = new Map<string, number>();

    dechets.forEach((dechet) => {
        const currentQuantity = dechetMap.get(dechet.Type) ?? 0;
        dechetMap.set(
            dechet.Type,
            currentQuantity + (dechet._sum.Quantite ?? 0)
        );
    });

    const paretoDechet = Array.from(dechetMap, ([name, uv]) => ({
        name,
        uv,
    })).sort((a, b) => b.uv - a.uv);

    return { paretoDechet };
}
