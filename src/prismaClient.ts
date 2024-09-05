import {
    PrismaClient,
    Historique_phase1,
    Historique_phase2,
    Historique_phase3,
    Historique_phase4,
} from '@prisma/client';

export const prisma = new PrismaClient();
export type HistoriqueRow =
    | Historique_phase1
    | Historique_phase2
    | Historique_phase3
    | Historique_phase4;
