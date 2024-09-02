import { prisma } from '../../prismaClient';
import { secondsBetweenDates } from '../utils';

export async function getParetoArret(): Promise<
    { name: string; uv: number }[]
> {
    const arrets = await prisma.arret.findMany({
        where: {
            Date_Debut: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
        },
    });
    const arretsWithDuree = arrets.map((arret) => ({
        ...arret,
        Duree: secondsBetweenDates(
            arret.Date_Debut,
            arret.Date_Fin ?? new Date()
        ),
    }));
    const groupedByCause = arretsWithDuree.reduce((acc, arret) => {
        const cause = arret.Cause ?? '';
        if (!acc[cause]) {
            acc[cause] = 0;
        }
        acc[cause] += arret.Duree;
        return acc;
    }, {} as Record<string, number>);

    const paretoArret = Object.entries(groupedByCause)
        .map(([name, uv]) => ({ name, uv }))
        .sort((a, b) => b.uv - a.uv);

    return paretoArret;
}
