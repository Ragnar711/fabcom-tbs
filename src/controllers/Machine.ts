import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { getParetoArret } from '../utils/machine/arret';
import { getDechetPareto } from '../utils/machine/dechets';
import { getQNCs } from '../utils/machine/nc';
import { getKPIsChart } from '../utils/machine/kpi';

type MachineData = {
    KPIs: {
        TD: number;
        TP: number;
        TQ: number;
        TR: number;
        TDech: number;
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
    paretoDechet: { type: string; quantite: number }[];
    paretoArret: { cause: string; duree: number }[];
    historiqueKPIs: {
        Date: string;
        TDech: number;
        TRS: number;
        TP: number;
        TQ: number;
        TD: number;
    }[];
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

    const QP = historique?.Of === of?.Numero ? historique?.QP : 0;
    const { paretoDechet } = await getDechetPareto(of?.Numero);
    const { QNC1, QNC2, QNC3, QNC4 } = await getQNCs(of?.Numero);

    const data: MachineData = {
        KPIs: {
            TD: historique?.TD ?? 0,
            TP: historique?.TP ?? 0,
            TQ: historique?.TQ ?? 0,
            TR: historique?.TR ?? 0,
            TDech: historique?.TDech ?? 0,
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
        historiqueKPIs: await getKPIsChart(),
    };

    res.status(200).json(data);
};
