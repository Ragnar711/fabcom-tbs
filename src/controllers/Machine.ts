import { Request, Response } from 'express';
import { prisma } from '../prismaClient';

type PDechet = {
    type: string;
    quantite: number;
};

// type PArret = {
//     cause: string;
//     duree: number;
// };

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
    // paretoArret: PArret[];
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
    };

    res.status(200).json(data);
};
