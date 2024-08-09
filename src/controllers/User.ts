import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../prismaClient';

type Role = 'ADMIN' | 'USER';

export const isValidInput = (
    nom: string,
    prenom: string,
    matricule: string,
    motDePasse: string,
    role: Role
): boolean => {
    return Boolean(nom && prenom && matricule && motDePasse && role);
};

export const signup = async (req: Request, res: Response) => {
    const { nom, prenom, matricule, motDePasse, role, image } = req.body;

    if (!isValidInput(nom, prenom, matricule, motDePasse, role)) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    try {
        const user = await prisma.utilisateur.create({
            data: {
                nom,
                prenom,
                matricule,
                motDePasse: hashedPassword,
                role,
                image: image ?? '',
            },
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

        return res.status(201).json({ token, user });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
};

export const signin = async (req: Request, res: Response) => {
    const { matricule, motDePasse } = req.body;

    if (!matricule || !motDePasse) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await prisma.utilisateur.findUnique({
        where: { matricule },
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

    return res.status(200).json({ token, user });
};

export const signout = async (_req: Request, res: Response) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Signed out successfully' });
};
