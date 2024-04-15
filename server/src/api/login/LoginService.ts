import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const LoginQuery = async (email: string, password: string) => {
  const LoginQuery = await prisma.employee.findMany({
    where: {
      email: email,
    },
  });
  return LoginQuery;
};
