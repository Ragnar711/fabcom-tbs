import { prisma } from '../prismaClient';

async function seedHistorique() {
    await prisma.historique_phase1.createMany({
        data: [
            {
                Date: '2024-01-30T08:00:00.000Z',
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
                Date: '2024-01-30T09:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 120,
                TQ: 22,
                TP: 16.3,
                TD: 6.2,
                TR: 8.8,
                TDech: 8,
                TQ_AVG: 21.5,
                TP_AVG: 16.3,
                TD_AVG: 6.2,
                TR_AVG: 8.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 51.0,
            },
            {
                Date: '2024-01-30T10:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 150,
                TQ: 24,
                TP: 17.3,
                TD: 7.2,
                TR: 9.8,
                TDech: 8,
                TQ_AVG: 22.5,
                TP_AVG: 17.3,
                TD_AVG: 7.2,
                TR_AVG: 9.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 52.0,
            },
            {
                Date: '2024-01-30T11:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 200,
                TQ: 26,
                TP: 18.3,
                TD: 8.2,
                TR: 10.8,
                TDech: 8,
                TQ_AVG: 23.5,
                TP_AVG: 18.3,
                TD_AVG: 8.2,
                TR_AVG: 10.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 53.0,
            },
            {
                Date: '2024-01-30T12:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 250,
                TQ: 28,
                TP: 19.3,
                TD: 9.2,
                TR: 11.8,
                TDech: 8,
                TQ_AVG: 24.5,
                TP_AVG: 19.3,
                TD_AVG: 9.2,
                TR_AVG: 11.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 54.0,
            },
        ],
    });

    await prisma.historique_phase2.createMany({
        data: [
            {
                Date: '2024-01-30T08:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 100,
                TQ: 30,
                TP: 20.3,
                TD: 10.2,
                TR: 12.8,
                TDech: 8,
                TQ_AVG: 25.5,
                TP_AVG: 20.3,
                TD_AVG: 10.2,
                TR_AVG: 12.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 55.0,
            },
            {
                Date: '2024-01-30T09:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 120,
                TQ: 32,
                TP: 21.3,
                TD: 11.2,
                TR: 13.8,
                TDech: 8,
                TQ_AVG: 26.5,
                TP_AVG: 21.3,
                TD_AVG: 11.2,
                TR_AVG: 13.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 56.0,
            },
            {
                Date: '2024-01-30T10:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 150,
                TQ: 34,
                TP: 22.3,
                TD: 12.2,
                TR: 14.8,
                TDech: 8,
                TQ_AVG: 27.5,
                TP_AVG: 22.3,
                TD_AVG: 12.2,
                TR_AVG: 14.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 57.0,
            },
            {
                Date: '2024-01-30T11:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 200,
                TQ: 36,
                TP: 23.3,
                TD: 13.2,
                TR: 15.8,
                TDech: 8,
                TQ_AVG: 28.5,
                TP_AVG: 23.3,
                TD_AVG: 13.2,
                TR_AVG: 15.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 58.0,
            },
            {
                Date: '2024-01-30T12:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 250,
                TQ: 38,
                TP: 24.3,
                TD: 14.2,
                TR: 16.8,
                TDech: 8,
                TQ_AVG: 29.5,
                TP_AVG: 24.3,
                TD_AVG: 14.2,
                TR_AVG: 16.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 59.0,
            },
        ],
    });

    await prisma.historique_phase3.createMany({
        data: [
            {
                Date: '2024-01-30T08:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 100,
                TQ: 40,
                TP: 25.3,
                TD: 15.2,
                TR: 17.8,
                TDech: 8,
                TQ_AVG: 30.5,
                TP_AVG: 25.3,
                TD_AVG: 15.2,
                TR_AVG: 17.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 60.0,
            },
            {
                Date: '2024-01-30T09:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 120,
                TQ: 42,
                TP: 26.3,
                TD: 16.2,
                TR: 18.8,
                TDech: 8,
                TQ_AVG: 31.5,
                TP_AVG: 26.3,
                TD_AVG: 16.2,
                TR_AVG: 18.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 61.0,
            },
            {
                Date: '2024-01-30T10:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 150,
                TQ: 44,
                TP: 27.3,
                TD: 17.2,
                TR: 19.8,
                TDech: 8,
                TQ_AVG: 32.5,
                TP_AVG: 27.3,
                TD_AVG: 17.2,
                TR_AVG: 19.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 62.0,
            },
            {
                Date: '2024-01-30T11:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 200,
                TQ: 46,
                TP: 28.3,
                TD: 18.2,
                TR: 20.8,
                TDech: 8,
                TQ_AVG: 33.5,
                TP_AVG: 28.3,
                TD_AVG: 18.2,
                TR_AVG: 20.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 63.0,
            },
            {
                Date: '2024-01-30T12:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 250,
                TQ: 48,
                TP: 29.3,
                TD: 19.2,
                TR: 21.8,
                TDech: 8,
                TQ_AVG: 34.5,
                TP_AVG: 29.3,
                TD_AVG: 19.2,
                TR_AVG: 21.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 64.0,
            },
        ],
    });

    await prisma.historique_phase4.createMany({
        data: [
            {
                Date: '2024-01-30T08:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 100,
                TQ: 50,
                TP: 30.3,
                TD: 20.2,
                TR: 22.8,
                TDech: 8,
                TQ_AVG: 35.5,
                TP_AVG: 30.3,
                TD_AVG: 20.2,
                TR_AVG: 22.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 65.0,
            },
            {
                Date: '2024-01-30T09:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 120,
                TQ: 52,
                TP: 31.3,
                TD: 21.2,
                TR: 23.8,
                TDech: 8,
                TQ_AVG: 36.5,
                TP_AVG: 31.3,
                TD_AVG: 21.2,
                TR_AVG: 23.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 66.0,
            },
            {
                Date: '2024-01-30T10:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 150,
                TQ: 54,
                TP: 32.3,
                TD: 22.2,
                TR: 24.8,
                TDech: 8,
                TQ_AVG: 37.5,
                TP_AVG: 32.3,
                TD_AVG: 22.2,
                TR_AVG: 24.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 67.0,
            },
            {
                Date: '2024-01-30T11:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 200,
                TQ: 56,
                TP: 33.3,
                TD: 23.2,
                TR: 25.8,
                TDech: 8,
                TQ_AVG: 38.5,
                TP_AVG: 33.3,
                TD_AVG: 23.2,
                TR_AVG: 25.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 68.0,
            },
            {
                Date: '2024-01-30T12:00:00.000Z',
                Poste: 'MATIN',
                Of: 'OF123',
                QP: 250,
                TQ: 58,
                TP: 34.3,
                TD: 24.2,
                TR: 26.8,
                TDech: 8,
                TQ_AVG: 39.5,
                TP_AVG: 34.3,
                TD_AVG: 24.2,
                TR_AVG: 26.8,
                TDech_AVG: 8.5,
                TQ_D: 2,
                TP_D: 3,
                TD_D: 1,
                TR_D: 1,
                TDech_D: 1,
                Cadence: 69.0,
            },
        ],
    });
}

type Poste = 'MATIN' | 'APRES_MIDI' | 'NUIT';

async function seedArret() {
    const start = new Date('2024-09-06T00:00:00.000Z');
    const end = new Date('2024-09-07T00:00:00.000Z');
    const randomDate = (start: Date, end: Date) => {
        const randomTime = Math.floor(
            Math.random() * (end.getTime() - start.getTime())
        );
        return new Date(start.getTime() + randomTime);
    };
    const arrets: {
        Date_Debut: Date;
        Date_Fin: Date | null;
        Poste: Poste;
        Of: string;
        Cause: string;
        Operateur: string;
    }[] = [];
    for (let i = 0; i < 8; i++) {
        const dateDebut = randomDate(start, end);
        const dateFin = new Date(dateDebut.getTime() + i * 60 * 60 * 1000);
        arrets.push({
            Date_Debut: dateDebut,
            Date_Fin: dateFin,
            Poste: ['MATIN', 'APRES_MIDI', 'NUIT'][
                Math.floor(Math.random() * 2)
            ] as Poste,
            Of: 'OF123',
            Cause: ['Panne', 'Maintenance', 'Test'][
                Math.floor(Math.random() * 2)
            ],
            Operateur: ['John Smith', 'Jane Doe', 'Test'][
                Math.floor(Math.random() * 2)
            ],
        });
    }
    await prisma.arret_phase1.createMany({
        data: arrets,
    });
    await prisma.arret_phase2.createMany({
        data: arrets,
    });
    await prisma.arret_phase3.createMany({
        data: arrets,
    });
    await prisma.arret_phase4.createMany({
        data: arrets,
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
                Poste: 'MATIN',
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
                Poste: 'MATIN',
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
                Poste: 'MATIN',
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
                Poste: 'MATIN',
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
                Poste: 'MATIN',
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
                Type: 'Type2',
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
                Type: 'Type2',
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
                Quantite: 1,
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
