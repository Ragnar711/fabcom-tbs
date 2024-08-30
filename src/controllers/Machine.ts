import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { secondsBetweenDates } from '../utils/dates';
import { Arret } from '@prisma/client';

type PDechet = {
    type: string;
    quantite: number;
};

type PArret = {
    cause: string;
    duree: number;
};

type ArretWithDuree = Arret & { Duree: number };

type MachineData = {
    KPIs: {
        TD: number;
        TP: number;
        TQ: number;
        TR: number;
        TDe: number;
    };
    OF: {
        NOF: string;
        Article: string;
        QO: number;
        QP: number;
    };
    NC: {
        QNC1: number;
        QNC2: number;
        QNC3: number;
        QNC4: number;
    };
    paretoDechet: PDechet[];
    paretoArret: PArret[];
};

export const machine = async (req: Request, res: Response) => {
    const historique = await prisma.historique.findFirst({
        orderBy: {
            Date: 'desc',
        },
    });

    const of = await prisma.ordreFabrication.findFirst({
        where: {
            Of_Prod: true,
        },
    });

    const dechets = await prisma.dechet.groupBy({
        by: ['Type'],
        where: {
            Of: of?.Numero,
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

    const QP = historique?.Of === of?.Numero ? historique?.QP : 0;

    let QD = 0;

    for (const dechet of dechets) {
        QD += dechet._sum.Quantite ?? 0;
    }

    const paretoDechet = dechets.map((dechet) => ({
        type: dechet.Type,
        quantite: dechet._sum.Quantite ?? 0,
    }));

    const [NC1, NC2, NC3, NC4] = await Promise.all([
        prisma.nonConforme.findMany({
            where: {
                Phase: 'ENVELOPPEUSE',
                Of: of?.Numero,
            },
        }),
        prisma.nonConforme.findMany({
            where: {
                Phase: 'COS',
                Of: of?.Numero,
            },
        }),
        prisma.nonConforme.findMany({
            where: {
                Phase: 'SOUDURE_BAC_COUVERCLE',
                Of: of?.Numero,
            },
        }),
        prisma.nonConforme.findMany({
            where: {
                Phase: 'SOUDURE_CONNEXIONS',
                Of: of?.Numero,
            },
        }),
    ]);

    const QNC1 = NC1.reduce((acc, cur) => acc + cur.Quantite, 0);
    const QNC2 = NC2.reduce((acc, cur) => acc + cur.Quantite, 0);
    const QNC3 = NC3.reduce((acc, cur) => acc + cur.Quantite, 0);
    const QNC4 = NC4.reduce((acc, cur) => acc + cur.Quantite, 0);

    async function getArretWithDuree(): Promise<ArretWithDuree[]> {
        const arrets = await prisma.arret.findMany({
            where: {
                Date_Debut: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
                },
            },
        });
        return arrets.map((arret) => ({
            ...arret,
            Duree: secondsBetweenDates(
                arret.Date_Debut,
                arret.Date_Fin ?? new Date()
            ),
        }));
    }

    async function getParetoArret(): Promise<
        { cause: string; duree: number }[]
    > {
        const arrets = await getArretWithDuree();
        const groupedByCause = arrets.reduce((acc, arret) => {
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

    const data: MachineData = {
        KPIs: {
            TD: historique?.TD ?? 0,
            TP: historique?.TP ?? 0,
            TQ: historique?.TQ ?? 0,
            TR: historique?.TR ?? 0,
            TDe: (((QP ?? 0) - (QD ?? 0)) / ((QP === 0 ? 1 : QP) ?? 1)) * 100,
        },
        OF: {
            NOF: of?.Numero ?? "Pas d'OF en cours",
            Article: of?.Article ?? '-',
            QO: of?.Quantite_Objectif ?? 0,
            QP: QP ?? 0,
        },
        NC: {
            QNC1,
            QNC2,
            QNC3,
            QNC4,
        },
        paretoDechet,
        paretoArret: await getParetoArret(),
    };

    res.status(200).json(data);
};
