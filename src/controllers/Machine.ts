import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { getParetoArret } from '../utils/machine/arret';
import { getDechetPareto } from '../utils/machine/dechets';
import { getQNCs } from '../utils/machine/nc';
import { getKPIsChart } from '../utils/machine/kpi';
import { secondsBetweenDates } from '../utils/utils';

type MachineData = {
    KPIs: {
        TD: number;
        TP: number;
        TQ: number;
        TR: number;
        TDech: number;
        TRS: number;
    };
    OF: {
        NOF: string;
        Article: string;
        QO: number;
        QP: number;
        QD: number;
    };
    NC: {
        QNC1: number;
        QNC2: number;
        QNC3: number;
        QNC4: number;
    };
    paretoDechet: { name: string; uv: number }[];
    paretoArret: { name: string; uv: number }[];
    historiqueKPIs: {
        Date: string;
        TDech: number;
        TRS: number;
        TP: number;
        TQ: number;
        TD: number;
    }[];
    lastDechet: {
        cause: string;
        quantite: number;
    };
    lastNC: {
        cause: string;
        quantite: number;
    };
    lastArret: {
        cause: string;
        duree: number;
    };
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

    const TRS =
        ((historique?.TD ?? 0) *
            (historique?.TP ?? 0) *
            (historique?.TQ ?? 0)) /
        10000;
    const QP = historique?.Of === of?.Numero ? historique?.QP : 0;
    const QD = await prisma.dechet.aggregate({
        _sum: {
            Quantite: true,
        },
        where: {
            Of: of?.Numero,
        },
    });

    const totalQuantity = QD._sum.Quantite;
    const { paretoDechet } = await getDechetPareto(of?.Numero);
    const { QNC1, QNC2, QNC3, QNC4 } = await getQNCs(of?.Numero);

    const lastDechet = await prisma.dechet.findFirst({
        orderBy: {
            Date: 'desc',
        },
    });

    const lastNC = await prisma.nonConforme.findFirst({
        orderBy: {
            Date: 'desc',
        },
    });

    const lastArret = await prisma.arret.findFirst({
        orderBy: {
            Date_Debut: 'desc',
        },
    });

    const data: MachineData = {
        KPIs: {
            TD: historique?.TD ?? 0,
            TP: historique?.TP ?? 0,
            TQ: historique?.TQ ?? 0,
            TR: historique?.TR ?? 0,
            TDech: historique?.TDech ?? 0,
            TRS,
        },
        OF: {
            NOF: of?.Numero ?? "Pas d'OF en cours",
            Article: of?.Article ?? '-',
            QO: of?.Quantite_Objectif ?? 0,
            QP: QP ?? 0,
            QD: totalQuantity ?? 0,
        },
        NC: {
            QNC1,
            QNC2,
            QNC3,
            QNC4,
        },
        paretoDechet,
        paretoArret: await getParetoArret(),
        historiqueKPIs: await getKPIsChart(),
        lastDechet: {
            cause: lastDechet?.Type ?? '-',
            quantite: lastDechet?.Quantite ?? 0,
        },
        lastNC: {
            cause: lastNC?.Type ?? '-',
            quantite: lastNC?.Quantite ?? 0,
        },
        lastArret: {
            cause: lastArret?.Cause ?? '-',
            duree: secondsBetweenDates(
                lastArret?.Date_Debut ?? new Date(),
                lastArret?.Date_Fin ?? new Date()
            ),
        },
    };

    res.status(200).json(data);
};
