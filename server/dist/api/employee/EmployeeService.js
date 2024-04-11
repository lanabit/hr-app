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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.findEmployeesById = exports.findEmployees = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const findEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield prisma.Employee.findMany();
    return employees;
});
exports.findEmployees = findEmployees;
const findEmployeesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield prisma.Employee.findUnique({
        where: {
            id,
        },
    });
    if (!employee)
        throw Error(`Employee with id ${id} does not exist`);
    return employee;
});
exports.findEmployeesById = findEmployeesById;
const createEmployee = (name, email, isHRAdmin, shiftId, positionId) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmployee = yield prisma.Employee.create({
        data: {
            name: name,
            email: email,
            isHRAdmin: isHRAdmin,
            shiftId: shiftId,
            positionId: positionId
        },
    });
    return newEmployee;
});
exports.createEmployee = createEmployee;
const updateEmployee = (id, name, email, isHRAdmin, shiftId, positionId) => __awaiter(void 0, void 0, void 0, function* () {
    if (isHRAdmin == undefined && !(shiftId && positionId && name && email))
        throw Error(`Data is missing some fields.`);
    const updateEmployeeData = yield prisma.Employee.update({
        where: {
            id,
        },
        data: {
            name: name,
            email: email,
            isHRAdmin: isHRAdmin,
            shiftId: shiftId,
            positionId: positionId
        },
    });
    return updateEmployeeData;
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.Employee.delete({
        where: {
            id,
        },
    });
});
exports.deleteEmployee = deleteEmployee;
