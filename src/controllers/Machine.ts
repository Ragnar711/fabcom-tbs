import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { getParetoArret } from '../utils/machine/arret';
import { getDechetPareto } from '../utils/machine/dechets';
import { getKPIsChart } from '../utils/machine/kpi';
import {
    getMostRecentArret,
    getMostRecentQt,
    secondsBetweenDates,
} from '../utils/utils';

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
    const historique_phase1 = await prisma.historique_phase1.findFirst({
        orderBy: {
            Date: 'desc',
        },
    });

    const historique_phase2 = await prisma.historique_phase2.findFirst({
        orderBy: {
            Date: 'desc',
        },
    });

    const historique_phase3 = await prisma.historique_phase3.findFirst({
        orderBy: {
            Date: 'desc',
        },
    });

    const historique_phase4 = await prisma.historique_phase4.findFirst({
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
        (((historique_phase1?.TD ?? 0) +
            (historique_phase2?.TD ?? 0) +
            (historique_phase3?.TD ?? 0) +
            (historique_phase4?.TD ?? 0)) *
            ((historique_phase1?.TP ?? 0) +
                (historique_phase2?.TP ?? 0) +
                (historique_phase3?.TP ?? 0) +
                (historique_phase4?.TP ?? 0)) *
            ((historique_phase1?.TQ ?? 0) +
                (historique_phase2?.TQ ?? 0) +
                (historique_phase3?.TQ ?? 0) +
                (historique_phase4?.TQ ?? 0))) /
        40000;
    const QP = historique_phase4?.Of === of?.Numero ? historique_phase4?.QP : 0;
    const QD_phase1 = await prisma.dechet_phase1.aggregate({
        _sum: {
            Quantite: true,
        },
        where: {
            Of: of?.Numero,
        },
    });
    const QD_phase2 = await prisma.dechet_phase2.aggregate({
        _sum: {
            Quantite: true,
        },
        where: {
            Of: of?.Numero,
        },
    });
    const QD_phase3 = await prisma.dechet_phase3.aggregate({
        _sum: {
            Quantite: true,
        },
        where: {
            Of: of?.Numero,
        },
    });
    const QD_phase4 = await prisma.dechet_phase4.aggregate({
        _sum: {
            Quantite: true,
        },
        where: {
            Of: of?.Numero,
        },
    });

    const totalQuantity =
        (QD_phase1._sum.Quantite ?? 0) +
        (QD_phase2._sum.Quantite ?? 0) +
        (QD_phase3._sum.Quantite ?? 0) +
        (QD_phase4._sum.Quantite ?? 0);
    const { paretoDechet } = await getDechetPareto(of?.Numero);

    const lastDechet_phase1 = await prisma.dechet_phase1.findFirst({
        orderBy: {
            Date: 'desc',
        },
        select: {
            Date: true,
            Type: true,
            Quantite: true,
        },
    });

    const lastDechet_phase2 = await prisma.dechet_phase2.findFirst({
        orderBy: {
            Date: 'desc',
        },
        select: {
            Date: true,
            Type: true,
            Quantite: true,
        },
    });

    const lastDechet_phase3 = await prisma.dechet_phase3.findFirst({
        orderBy: {
            Date: 'desc',
        },
        select: {
            Date: true,
            Type: true,
            Quantite: true,
        },
    });

    const lastDechet_phase4 = await prisma.dechet_phase4.findFirst({
        orderBy: {
            Date: 'desc',
        },
        select: {
            Date: true,
            Type: true,
            Quantite: true,
        },
    });

    const lastDechet = getMostRecentQt(
        lastDechet_phase1,
        lastDechet_phase2,
        lastDechet_phase3,
        lastDechet_phase4
    );

    const lastNC_phase1 = await prisma.nonConforme_phase1.findFirst({
        orderBy: {
            Date: 'desc',
        },
        select: {
            Date: true,
            Type: true,
            Quantite: true,
        },
    });

    const lastNC_phase2 = await prisma.nonConforme_phase2.findFirst({
        orderBy: {
            Date: 'desc',
        },
        select: {
            Date: true,
            Type: true,
            Quantite: true,
        },
    });

    const lastNC_phase3 = await prisma.nonConforme_phase3.findFirst({
        orderBy: {
            Date: 'desc',
        },
        select: {
            Date: true,
            Type: true,
            Quantite: true,
        },
    });

    const lastNC_phase4 = await prisma.nonConforme_phase4.findFirst({
        orderBy: {
            Date: 'desc',
        },
        select: {
            Date: true,
            Type: true,
            Quantite: true,
        },
    });

    const lastNC = getMostRecentQt(
        lastNC_phase1,
        lastNC_phase2,
        lastNC_phase3,
        lastNC_phase4
    );

    const lastArret_phase1 = await prisma.arret_phase1.findFirst({
        orderBy: {
            Date_Debut: 'desc',
        },
        select: {
            Date_Debut: true,
            Date_Fin: true,
            Cause: true,
        },
    });

    const lastArret_phase2 = await prisma.arret_phase2.findFirst({
        orderBy: {
            Date_Debut: 'desc',
        },
        select: {
            Date_Debut: true,
            Date_Fin: true,
            Cause: true,
        },
    });

    const lastArret_phase3 = await prisma.arret_phase3.findFirst({
        orderBy: {
            Date_Debut: 'desc',
        },
        select: {
            Date_Debut: true,
            Date_Fin: true,
            Cause: true,
        },
    });

    const lastArret_phase4 = await prisma.arret_phase4.findFirst({
        orderBy: {
            Date_Debut: 'desc',
        },
        select: {
            Date_Debut: true,
            Date_Fin: true,
            Cause: true,
        },
    });

    const lastArret = getMostRecentArret(
        lastArret_phase1,
        lastArret_phase2,
        lastArret_phase3,
        lastArret_phase4
    );

    const QNC1 = await prisma.nonConforme_phase1.aggregate({
        _sum: {
            Quantite: true,
        },
        where: {
            Of: of?.Numero,
        },
    });

    const QNC2 = await prisma.nonConforme_phase2.aggregate({
        _sum: {
            Quantite: true,
        },
        where: {
            Of: of?.Numero,
        },
    });

    const QNC3 = await prisma.nonConforme_phase3.aggregate({
        _sum: {
            Quantite: true,
        },
        where: {
            Of: of?.Numero,
        },
    });

    const QNC4 = await prisma.nonConforme_phase4.aggregate({
        _sum: {
            Quantite: true,
        },
        where: {
            Of: of?.Numero,
        },
    });

    const data: MachineData = {
        KPIs: {
            TD:
                ((historique_phase1?.TD ?? 0) +
                    (historique_phase2?.TD ?? 0) +
                    (historique_phase3?.TD ?? 0) +
                    (historique_phase4?.TD ?? 0)) /
                4,
            TP:
                ((historique_phase1?.TP ?? 0) +
                    (historique_phase2?.TP ?? 0) +
                    (historique_phase3?.TP ?? 0) +
                    (historique_phase4?.TP ?? 0)) /
                4,
            TQ:
                ((historique_phase1?.TQ ?? 0) +
                    (historique_phase2?.TQ ?? 0) +
                    (historique_phase3?.TQ ?? 0) +
                    (historique_phase4?.TQ ?? 0)) /
                4,
            TR:
                ((historique_phase1?.TR ?? 0) +
                    (historique_phase2?.TR ?? 0) +
                    (historique_phase3?.TR ?? 0) +
                    (historique_phase4?.TR ?? 0)) /
                4,
            TDech:
                ((historique_phase1?.TDech ?? 0) +
                    (historique_phase2?.TDech ?? 0) +
                    (historique_phase3?.TDech ?? 0) +
                    (historique_phase4?.TDech ?? 0)) /
                4,
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
            QNC1: QNC1._sum.Quantite ?? 0,
            QNC2: QNC2._sum.Quantite ?? 0,
            QNC3: QNC3._sum.Quantite ?? 0,
            QNC4: QNC4._sum.Quantite ?? 0,
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
