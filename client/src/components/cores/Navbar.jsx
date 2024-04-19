'use client';
import { axiosInstance } from '../../config/axios';
import { UserContext } from '../../supports/context/userContext';
import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  // const navigate = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const localStorageData = () => {
    let userLocalStorage = localStorage.getItem('user');
    return JSON.parse(userLocalStorage);
  };

  const handleKeepLogin = async () => {
    try {
      const userId = localStorageData().id;

      let res = await axiosInstance.post(`/login/keep-login`, { userId });
      res = res.data;

      setUserData({
        id: res.id,
        isHRAdmin: res.isHRAdmin,
        isClockedIn: false,
        isClockedOut: false,
        attendanceId: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData({});
    window.location.reload();
    // navigate.push('/login');
  };

  useEffect(() => {
    handleKeepLogin();
  }, []);

  const userLocalStorage = localStorageData();

  return (
    <div className="h-[100vh]">
      {!userData ? null : (
        <div className="h-[100%] w-full bg-red-300 p-10">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="drawer-button">
                Masuk
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="text-shuttlegray menu relative min-h-full w-80 bg-base-200 p-4 font-bold">
                <div className="pt-10">
                  {userData?.isHRAdmin == true ? (
                    <>
                      <li>
                        <Link
                          className="hover:text-burnorange"
                          href="/employee"
                        >
                          Employee
                        </Link>
                      </li>
                      <li className="hover:text-burnorange">
                        <Link href="/attendance">Attendance</Link>
                      </li>
                    </>
                  ) : null}
                  <li>
                    <Link
                      className="hover:text-burnorange"
                      href="/leave-request"
                    >
                      Leave Request
                    </Link>
                  </li>
                  {userLocalStorage.isClockedIn ? null : (
                    <li>
                      <Link className="hover:text-burnorange" href="/clock-in">
                        Clock In
                      </Link>
                    </li>
                  )}
                  {userLocalStorage.isClockedOut ? null : (
                    <li>
                      <Link className="hover:text-burnorange" href="/clock-out">
                        Clock Out
                      </Link>
                    </li>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  disabled={
                    userLocalStorage.isClockedIn &&
                    userLocalStorage.isClockedOut
                      ? false
                      : true
                  }
                  className="btn btn-sm"
                >
                  Logout
                </button>

                {/* Close button */}
                <input id="my-drawer" type="checkbox" className="hidden" />
                <div className="absolute right-5">
                  <label htmlFor="my-drawer">Keluar</label>
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
