"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let position of positions) {
            yield prisma.position.create({
                data: position,
            });
        }
        for (let shift of shifts) {
            yield prisma.shift.create({
                data: shift,
            });
        }
        for (let employee of employees) {
            yield prisma.employee.create({
                data: employee,
            });
        }
    });
}
main()
    .catch((e) => {
    console.log(e);
    // process.exit(1);
})
    .finally(() => {
    prisma.$disconnect();
});
