'use client';
import { useContext } from 'react';
import { UserContext } from '../../supports/context/userContext';

export default function Dashboard() {
  const { userData, setUserData } = useContext(UserContext);
  // console.log(userData?.isHRAdmin);

  const localStorageData = () => {
    let userLocalStorage = localStorage.getItem('user');
    return JSON.parse(userLocalStorage);
  };
  // console.log(localStorageData().isHRAdmin);

  const AdminFilter = () => {
    let result = '';
    if (localStorageData()?.isHRAdmin === true) {
      result = 'HR Admin';
    } else {
      result = 'Peliharaan perusahaan';
    }
    return result;
  };
  return (
    <div className="flex h-screen items-center justify-center">
      {localStorageData()?.isHRAdmin === true ? (
        <p>Hello, Welcome Back {AdminFilter()}</p>
      ) : (
        <p>Harus kerja bagai quda {AdminFilter()}</p>
      )}
    </div>
  );
}
