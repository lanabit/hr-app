import { axiosInstance } from '../../config/axios';
import { toast } from 'react-toastify';

export const getEmployees = async () => {
  const DateTransform = (dateData) => {
    return new Date(dateData).getUTCHours().toString().padStart(2, '0') + ':00';
  };

  try {
    let employeeData = await axiosInstance.get(`/employees/`);
    let a = employeeData.data.data;
    for (let i = 0; i < a.length; i++) {
      a[i].start = DateTransform(a[i].shift.start);
      a[i].end = DateTransform(a[i].shift.end);
    }
    return employeeData.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeById = async (id) => {
  try {
    let employeeData = await axiosInstance.get(`/employees/${id}`);
    return employeeData.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const newEmployee = async (data) => {
  try {
    console.log(data);
    let { name, email, password, positionId, shiftId } = data;
    const isHRAdmin = false;
    console.log('shiftId pre parseInt', shiftId);
    positionId = parseInt(positionId);
    shiftId = parseInt(shiftId);

    const postData = {
      name,
      email,
      password,
      isHRAdmin,
      shiftId,
      positionId,
    };
    console.log(postData);
    let employeeData = await axiosInstance.post(`/employees`, postData);
    if (employeeData.data.status !== 'success') {
      throw new Error('New employee creation failed');
    }
    toast.success(`Data creation success`);
    return `New employee data has been created`;
  } catch (error) {
    toast.error(error.message);
    return error.message;
  }
};

export const editEmployee = async (id, data) => {
  try {
    console.log(data);
    let { name, email, password, positionId, shiftId } = data;
    const isHRAdmin = false;
    console.log('shiftId pre parseInt', shiftId);
    positionId = parseInt(positionId);
    shiftId = parseInt(shiftId);

    const postData = {
      name,
      email,
      password,
      isHRAdmin,
      shiftId,
      positionId,
    };
    let employeeData = await axiosInstance.put(`/employees/${id}`, postData);
    if (employeeData.data.status !== 'success') {
      throw new Error('Update Failed');
    }
    toast.success('Data update success');
    return `Employee data of ID ${id} has been updated`;
  } catch (error) {
    return error.message;
  }
};

export const deleteEmployee = async (id, data) => {
  try {
    let { confirm } = data;
    if (confirm !== 'Delete Employee') throw new Error('Employee Delete Fail!');

    await axiosInstance.delete(`/employees/${id}`);
    toast.success(`Data deletion success`);
    return `Employee data of ID ${id} has been deleted`;
  } catch (error) {
    toast.error(error.message);
    return error.message;
  }
};
