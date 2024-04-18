import { Router } from "express";
import { showEmployees, showEmployeeById, newEmployee, editEmployeeInfo, deleteEmployeeInfo } from "./EmployeeController";

const router = Router()

router.get('/', showEmployees)
router.get('/:id', showEmployeeById)
router.post('/', newEmployee)
router.put('/:id', editEmployeeInfo)
router.delete('/:id', deleteEmployeeInfo)

export default router;