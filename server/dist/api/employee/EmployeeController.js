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
exports.deleteEmployeeInfo = exports.editEmployeeInfo = exports.newEmployee = exports.showEmployeeById = exports.showEmployees = void 0;
const EmployeeService_1 = require("./EmployeeService");
const showEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, EmployeeService_1.findEmployees)();
        res.send({
            status: "success",
            data: employees,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.showEmployees = showEmployees;
const showEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const employees = yield (0, EmployeeService_1.findEmployeesById)(id);
        res.send({
            status: "success",
            data: employees,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.showEmployeeById = showEmployeeById;
const newEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, isHRAdmin, shiftId, positionId } = req.body;
        const newEmployeeData = yield (0, EmployeeService_1.createEmployee)(name, email, password, isHRAdmin, shiftId, positionId);
        res.send({
            status: "success",
            message: "new employee register success",
            data: newEmployeeData,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.newEmployee = newEmployee;
const editEmployeeInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, email, password, isHRAdmin, shiftId, positionId } = req.body;
        yield (0, EmployeeService_1.findEmployeesById)(id);
        const newEmployeeData = yield (0, EmployeeService_1.updateEmployee)(id, name, email, password, isHRAdmin, shiftId, positionId);
        res.send({
            status: "success",
            message: "employee info update success",
            data: newEmployeeData,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.editEmployeeInfo = editEmployeeInfo;
const deleteEmployeeInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield (0, EmployeeService_1.findEmployeesById)(id);
        yield (0, EmployeeService_1.deleteEmployee)(id);
        res.send({
            status: "success",
            message: `Employee with id ${id} successfully deleted`,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.deleteEmployeeInfo = deleteEmployeeInfo;
