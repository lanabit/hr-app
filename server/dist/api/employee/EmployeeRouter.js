"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmployeeController_1 = require("./EmployeeController");
const router = (0, express_1.Router)();
router.get('/', EmployeeController_1.showEmployees);
router.get('/:id', EmployeeController_1.showEmployeeById);
router.post('/', EmployeeController_1.newEmployee);
router.put('/:id', EmployeeController_1.editEmployeeInfo);
router.delete('/:id', EmployeeController_1.deleteEmployeeInfo);
exports.default = router;
