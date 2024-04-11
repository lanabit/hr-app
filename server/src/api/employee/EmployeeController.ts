import { Request, Response } from 'express'
import { findEmployees, findEmployeesById, createEmployee, updateEmployee, deleteEmployee } from './EmployeeService';


export const showEmployees = async(req: Request, res: Response): Promise<void> => {
  try {
    const employees = await findEmployees();
    res.send({
      status: 'success',
      data: employees
    })
  } catch (error: any) {
    res.send({
      status: 'error',
      message: error.message
    })
  }
};

export const showEmployeeById = async(req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const employees = await findEmployeesById(id)
    res.send({
      status: 'success',
      data: employees
    })
  } catch (error: any) {
    res.send({
      status: 'error',
      message: error.message
    })
  }
};

export const newEmployee = async(req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, isHRAdmin, shiftId, positionId} = req.body;
    const newEmployeeData = await createEmployee(name, email, isHRAdmin, shiftId, positionId)
    
    res.send({
      status: 'success',
      message: 'new employee register success',
      data: newEmployeeData
    })
  } catch (error: any) {
    res.send({
      status: 'error',
      message: error.message
    })
  }
};

export const editEmployeeInfo = async(req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const { name, email, isHRAdmin, shiftId, positionId } = req.body;
    await findEmployeesById(id)
    const newEmployeeData = await updateEmployee(id, name, email, isHRAdmin, shiftId, positionId)

    res.send({
      status: 'success',
      message: 'employee info update success',
      data: newEmployeeData
    })
  } catch (error: any) {
    res.send({
      status: 'error',
      message: error.message
    })
  }
};

export const deleteEmployeeInfo = async(req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    await findEmployeesById(id)
    await deleteEmployee(id)

    res.send({
      status: 'success',
      message: `Employee with id ${id} successfully deleted`
    })
  } catch (error: any) {
    res.send({
      status: 'error',
      message: error.message
    })
  }
};
