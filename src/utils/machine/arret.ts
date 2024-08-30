import { prisma } from '../../prismaClient';

function secondsBetweenDates(
    dateStart: Date | string,
    dateEnd: Date | string
): number {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInSeconds = differenceInMilliseconds / 1000;
    return differenceInSeconds;
}

export async function getParetoArret(): Promise<
    { cause: string; duree: number }[]
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
        .map(([cause, duree]) => ({ cause, duree }))
        .sort((a, b) => b.duree - a.duree);

    return paretoArret;
}
