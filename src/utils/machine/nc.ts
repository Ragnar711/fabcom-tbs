import { prisma } from '../../prismaClient';

export async function getQNCs(
    ofNumero: string = ''
): Promise<{ QNC1: number; QNC2: number; QNC3: number; QNC4: number }> {
    const [NC1, NC2, NC3, NC4] = await Promise.all([
        prisma.nonConforme.findMany({
            where: {
                Phase: 'ENVELOPPEUSE',
                Of: ofNumero,
            },
        }),
        prisma.nonConforme.findMany({
            where: {
                Phase: 'COS',
                Of: ofNumero,
            },
        }),
        prisma.nonConforme.findMany({
            where: {
                Phase: 'SOUDURE_BAC_COUVERCLE',
                Of: ofNumero,
            },
        }),
        prisma.nonConforme.findMany({
            where: {
                Phase: 'SOUDURE_CONNEXIONS',
                Of: ofNumero,
            },
        }),
    ]);

    const QNC1 = NC1.reduce((acc, cur) => acc + cur.Quantite, 0);
    const QNC2 = NC2.reduce((acc, cur) => acc + cur.Quantite, 0);
    const QNC3 = NC3.reduce((acc, cur) => acc + cur.Quantite, 0);
    const QNC4 = NC4.reduce((acc, cur) => acc + cur.Quantite, 0);

    return { QNC1, QNC2, QNC3, QNC4 };
}
