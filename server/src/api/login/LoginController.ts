import { Request, Response } from 'express';
import { LoginQuery, KeepLoginQuery } from './LoginService';

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [user] = await LoginQuery(email);

    if (user.password != password) {
      return res.status(404).json({ message: 'Wrong password' });
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

    const findUserById = await KeepLoginQuery(userId);

    res.send(findUserById);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
