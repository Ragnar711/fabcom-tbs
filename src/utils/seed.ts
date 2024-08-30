import { prisma } from '../prismaClient';

async function seedHistorique() {
    await prisma.historique.create({
        data: {
            Date: new Date(),
            Poste: 'MATIN',
            Of: 'OF123',
            QP: 100,
            TQ: 20,
            TP: 15.3,
            TD: 5.2,
            TR: 7.8,
            TQ_AVG: 20.5,
            TP_AVG: 15.3,
            TD_AVG: 5.2,
            TR_AVG: 7.8,
            TQ_D: 2,
            TP_D: 3,
            TD_D: 1,
            TR_D: 1,
            Cadence: 50.0,
        },
    });
}

async function seedArret() {
    await prisma.arret.createMany({
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
}

async function seedOrdreFabrication() {
    await prisma.ordreFabrication.create({
        data: {
            Numero: 'OF123',
            Article: 'Article1',
            Quantite_Objectif: 100,
            Of_Prod: true,
            Cadence: 60,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
}

async function seedNonConforme() {
    await prisma.nonConforme.createMany({
        data: [
            {
                Date: new Date(),
                Poste: 'NUIT',
                Of: 'OF123',
                Operateur: 'Jane Doe',
                Quantite: 5,
                Type: 'Type1',
                Phase: 'ENVELOPPEUSE',
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
                Phase: 'COS',
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
                Phase: 'COS',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
}

async function seedDechet() {
    await prisma.dechet.createMany({
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
                Quantite: 6,
                Type: 'Type1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
}

async function main() {
    try {
        await prisma.historique.deleteMany();
        await prisma.arret.deleteMany();
        await prisma.ordreFabrication.deleteMany();
        await prisma.nonConforme.deleteMany();
        await prisma.dechet.deleteMany();
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
