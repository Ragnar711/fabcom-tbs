import { prisma } from '../prismaClient';
import { Request, Response } from 'express';

export const addOf = async (req: Request, res: Response) => {
    const { Numero, Article, Quantite_Objectif, Cadence } = req.body;

    const of = await prisma.ordreFabrication.create({
        data: {
            Numero,
            Article,
            Quantite_Objectif,
            Cadence,
            Of_Prod: true,
        },
    });

    await prisma.ordreFabrication.updateMany({
        where: {
            Of_Prod: true,
        },
        data: {
            Of_Prod: false,
        },
    });

    res.status(201).json({ of });
};
