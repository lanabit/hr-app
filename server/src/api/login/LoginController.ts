import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
export { LoginQuery } from './LoginService';

const prisma = new PrismaClient();

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [user] = await prisma.employee.findMany({
      where: {
        email: email,
      },
    });
    // console.log(user);

    if (user.password != password) {
      return res.status(404).send('Wrong password');
    }

    const { id, position, name } = user;

    return res.send({
      data: {
        id,
        position,
        name,
        email,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

export const keepLogin = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const findUserById = await prisma.employee.findUnique({
      where: {
        id: userId,
      },
    });

    res.send(findUserById);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
