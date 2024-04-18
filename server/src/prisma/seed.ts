const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const shifts = [
  { start: "1970-01-01T09:00:00.000Z", end: "1970-01-01T18:00:00.000Z" },
  { start: "1970-01-01T13:00:00.000Z", end: "1970-01-01T22:00:00.000Z" },
];

const positions = [
  { positionName: "Manager", salary: 25000000 },
  { positionName: "Project/Product Manager", salary: 17500000 },
  { positionName: "Programmer", salary: 15000000 },
  { positionName: "HR Staff", salary: 12000000 },
];

const employees = [
  {
    name: "Wulan Tsabita",
    email: "wulan@test.com",
    password: "12345678",
    isHRAdmin: true,
    shiftId: 1,
    positionId: 4,
  },
  {
    name: "Hanief Bunyiep",
    email: "hanief@test.com",
    password: "12345678",
    isHRAdmin: false,
    shiftId: 2,
    positionId: 2,
  },
];

async function main() {
  for (let position of positions) {
    await prisma.position.create({
      data: position,
    });
  }

  for (let shift of shifts) {
    await prisma.shift.create({
      data: shift,
    });
  }

  for (let employee of employees) {
    await prisma.employee.create({
      data: employee,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    // process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
