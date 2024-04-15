import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const LoginQuery = async (email: string) => {
  const LoginQuery = await prisma.employee.findMany({
    where: {
      email: email,
    },
  });
  return LoginQuery;
};

export const KeepLoginQuery = async (userId: number) => {
  const KeepLoginQuery = await prisma.employee.findUnique({
    where: {
      id: userId,
    },
  });

  return KeepLoginQuery;
};
