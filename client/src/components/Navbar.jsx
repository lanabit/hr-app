'use client';
import { axiosInstance } from '@/config/axios';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);

  const handleKeepLogin = async () => {
    try {
      let userLocalStorage = localStorage.getItem('user');
      userLocalStorage = JSON.parse(userLocalStorage);

      const userId = userLocalStorage.id;

      //   console.log(userLocalStorage.id);

      let res = await axiosInstance.post(`/keepLogin`, { userId });
      res = res.data;
      console.log(res);

      setUserData({
        id: res.id,
        name: res.name,
        email: res.email,
        position: res.position,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData({});
    window.location.reload();
  };

  useEffect(() => {
    handleKeepLogin();
  }, []);

  return (
    <div className="navbar bg-red-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      {userData !== null ? (
        <button
          className="bg-black p-2 text-white hover:bg-slate-600"
          onClick={handleLogout}
        >
          <a>Logout</a>
        </button>
      ) : (
        <div>
          <a className="btn btn-ghost text-xl">blom login</a>
        </div>
      )}
    </div>
  );
}
