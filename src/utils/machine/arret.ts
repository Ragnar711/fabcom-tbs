import { prisma } from '../../prismaClient';
import { secondsBetweenDates } from '../utils';

export async function getParetoArret(): Promise<
    { name: string; uv: number }[]
> {
    const arrets = [];

    const arrets_phase1 = await prisma.arret_phase1.findMany({
        where: {
            Date_Debut: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
        },
    });
    const arrets_phase2 = await prisma.arret_phase2.findMany({
        where: {
            Date_Debut: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
        },
    });
    const arrets_phase3 = await prisma.arret_phase3.findMany({
        where: {
            Date_Debut: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
        },
    });
    const arrets_phase4 = await prisma.arret_phase4.findMany({
        where: {
            Date_Debut: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
        },
    });
    arrets.push(
        ...arrets_phase1,
        ...arrets_phase2,
        ...arrets_phase3,
        ...arrets_phase4
    );
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
