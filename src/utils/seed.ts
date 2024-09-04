import { prisma } from '../prismaClient';

async function seedHistorique() {
    await prisma.historique_phase1.createMany({
        data: [
            {
                Date: '2024-01-30T06:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 100,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T07:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 100,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T08:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 120,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T09:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 150,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T10:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 200,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T11:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 250,
                TQ: 80,
                TP: 50.3,
                TD: 60.2,
                TR: 70.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
        ],
    });
    await prisma.historique_phase2.createMany({
        data: [
            {
                Date: '2024-01-30T12:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 250,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T13:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 260,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
        ],
    });
    await prisma.historique_phase3.createMany({
        data: [
            {
                Date: '2024-01-30T14:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 300,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T15:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 300,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T16:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 290,
                TQ: 60,
                TP: 30.3,
                TD: 40.2,
                TR: 90.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
        ],
    });
    await prisma.historique_phase4.createMany({
        data: [
            {
                Date: '2024-01-30T17:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 280,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T18:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 270,
                TQ: 20,
                TP: 15.3,
                TD: 5.2,
                TR: 7.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
            {
                Date: '2024-01-30T19:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 250,
                TQ: 80,
                TP: 50.3,
                TD: 60.2,
                TR: 70.8,
                TDech: 8,
                TQ_AVG: 20.5,
                TP_AVG: 15.3,
                TD_AVG: 5.2,
                TR_AVG: 7.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 50.0,
            },
        ],
    });
}

async function seedArret() {
    await prisma.arret_phase1.createMany({
        data: [
            {
                Date_Debut: new Date(),
                Date_Fin: null,
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Cause: 'Panne',
                Operateur: 'John Doe',
            },
            {
                Date_Debut: '2022-01-01T00:00:00.000Z',
                Date_Fin: '2022-01-01T04:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                Cause: 'Maintenance',
                Operateur: 'John Doe',
            },
            {
                Date_Debut: '2022-01-01T12:00:00.000Z',
                Date_Fin: '2022-01-01T16:00:00.000Z',
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Cause: 'Panne',
                Operateur: 'John Doe',
            },
        ],
    });
    await prisma.arret_phase2.createMany({
        data: [
            {
                Date_Debut: new Date(),
                Date_Fin: null,
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Cause: 'Panne',
                Operateur: 'John Doe',
            },
            {
                Date_Debut: '2022-01-01T00:00:00.000Z',
                Date_Fin: '2022-01-01T04:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                Cause: 'Maintenance',
                Operateur: 'John Doe',
            },
            {
                Date_Debut: '2022-01-01T12:00:00.000Z',
                Date_Fin: '2022-01-01T16:00:00.000Z',
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Cause: 'Panne',
                Operateur: 'John Doe',
            },
        ],
    });
    await prisma.arret_phase3.createMany({
        data: [
            {
                Date_Debut: new Date(),
                Date_Fin: null,
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Cause: 'Panne',
                Operateur: 'John Doe',
            },
            {
                Date_Debut: '2022-01-01T12:00:00.000Z',
                Date_Fin: '2022-01-01T16:00:00.000Z',
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Cause: 'Panne',
                Operateur: 'John Doe',
            },
        ],
    });
    await prisma.arret_phase4.createMany({
        data: [
            {
                Date_Debut: new Date(),
                Date_Fin: null,
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Cause: 'Panne',
                Operateur: 'John Doe',
            },
            {
                Date_Debut: '2022-01-01T00:00:00.000Z',
                Date_Fin: '2022-01-01T04:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                Cause: 'Maintenance',
                Operateur: 'John Doe',
            },
        ],
    });
}

async function seedOrdreFabrication() {
    await prisma.ordreFabrication.create({
        data: {
            Numero: 'OF123',
            Article: 'Article1',
            Quantite_Objectif: 500,
            Of_Prod: true,
            Cadence: 60,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
}

async function seedNonConforme() {
    await prisma.nonConforme_phase1.createMany({
        data: [
            {
                Date: new Date(),
                Poste: 'NUIT',
                Of: 'OF123',
                Operateur: 'Jane Doe',
                Quantite: 5,
                Type: 'Type1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Date: new Date(),
                Poste: 'MATIN',
                Of: 'OF123',
                Operateur: 'John Smith',
                Quantite: 3,
                Type: 'Type2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Date: new Date(),
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Operateur: 'Alice Johnson',
                Quantite: 7,
                Type: 'Type3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
    await prisma.nonConforme_phase2.createMany({
        data: [
            {
                Date: new Date(),
                Poste: 'NUIT',
                Of: 'OF123',
                Operateur: 'Jane Doe',
                Quantite: 5,
                Type: 'Type1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Date: new Date(),
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Operateur: 'Alice Johnson',
                Quantite: 7,
                Type: 'Type3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
    await prisma.nonConforme_phase3.createMany({
        data: [
            {
                Date: new Date(),
                Poste: 'MATIN',
                Of: 'OF123',
                Operateur: 'John Smith',
                Quantite: 3,
                Type: 'Type2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Date: new Date(),
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Operateur: 'Alice Johnson',
                Quantite: 7,
                Type: 'Type3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
    await prisma.nonConforme_phase4.createMany({
        data: [
            {
                Date: new Date(),
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Operateur: 'Alice Johnson',
                Quantite: 7,
                Type: 'Type3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
}

async function seedDechet() {
    await prisma.dechet_phase1.createMany({
        data: [
            {
                Date: new Date(),
                Poste: 'MATIN',
                Of: 'OF123',
                Operateur: 'John Smith',
                Quantite: 3,
                Type: 'Type3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Date: new Date(),
                Poste: 'NUIT',
                Of: 'OF123',
                Operateur: 'Jane Doe',
                Quantite: 4,
                Type: 'Type1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Date: new Date(),
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Operateur: 'Alice Johnson',
                Quantite: 3,
                Type: 'Type1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
    await prisma.dechet_phase2.createMany({
        data: [
            {
                Date: new Date(),
                Poste: 'NUIT',
                Of: 'OF123',
                Operateur: 'Jane Doe',
                Quantite: 4,
                Type: 'Type1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Date: new Date(),
                Poste: 'APRES_MIDI',
                Of: 'OF123',
                Operateur: 'Alice Johnson',
                Quantite: 8,
                Type: 'Type1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
    await prisma.dechet_phase3.createMany({
        data: [
            {
                Date: new Date(),
                Poste: 'NUIT',
                Of: 'OF123',
                Operateur: 'Jane Doe',
                Quantite: 4,
                Type: 'Type1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
    await prisma.dechet_phase4.createMany({
        data: [
            {
                Date: new Date(),
                Poste: 'NUIT',
                Of: 'OF123',
                Operateur: 'Jane Doe',
                Quantite: 10,
                Type: 'Type1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
}

async function main() {
    try {
        await prisma.historique_phase1.deleteMany();
        await prisma.historique_phase2.deleteMany();
        await prisma.historique_phase3.deleteMany();
        await prisma.historique_phase4.deleteMany();
        await prisma.arret_phase1.deleteMany();
        await prisma.arret_phase2.deleteMany();
        await prisma.arret_phase3.deleteMany();
        await prisma.arret_phase4.deleteMany();
        await prisma.ordreFabrication.deleteMany();
        await prisma.nonConforme_phase1.deleteMany();
        await prisma.nonConforme_phase2.deleteMany();
        await prisma.nonConforme_phase3.deleteMany();
        await prisma.nonConforme_phase4.deleteMany();
        await prisma.dechet_phase1.deleteMany();
        await prisma.dechet_phase2.deleteMany();
        await prisma.dechet_phase3.deleteMany();
        await prisma.dechet_phase4.deleteMany();
        await seedHistorique();
        await seedArret();
        await seedOrdreFabrication();
        await seedNonConforme();
        await seedDechet();
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
