const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const findEmployees = async () => {
  const employees: any = await prisma.Employee.findMany();
  return employees;
};

export const findEmployeesById = async (id: number) => {
  const employee = await prisma.Employee.findUnique({
    where: {
      id,
    },
    include: {
      position: true,
    },
  });
  if (!employee) throw Error(`Employee with id ${id} does not exist`);

  return employee;
};

export const createEmployee = async (
  name: string,
  email: string,
  isHRAdmin: boolean,
  shiftId: number,
  positionId: number
) => {
  const newEmployee = await prisma.Employee.create({
    data: {
      name: name,
      email: email,
      isHRAdmin: isHRAdmin,
      shiftId: shiftId,
      positionId: positionId,
    },
  });

  return newEmployee;
};

export const updateEmployee = async (
  id: number,
  name: string,
  email: string,
  isHRAdmin: boolean,
  shiftId: number,
  positionId: number
) => {
  if (isHRAdmin == undefined && !(shiftId && positionId && name && email))
    throw Error(`Data is missing some fields.`);

  const updateEmployeeData = await prisma.Employee.update({
    where: {
      id,
    },
    data: {
      name: name,
      email: email,
      isHRAdmin: isHRAdmin,
      shiftId: shiftId,
      positionId: positionId,
    },
  });

  return updateEmployeeData;
};

export const deleteEmployee = async (id: number) => {
  await prisma.Employee.delete({
    where: {
      id,
    },
  });
};
