'use client';
import { axiosInstance } from '../../config/axios';
import { UserContext } from '../../supports/context/userContext';
import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

export default function Navbar() {
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
        <div className="bg-provincial border-charcoal h-full border-r-4 border-dashed pt-6">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="drawer-button flex justify-center"
              >
                <GiHamburgerMenu size={25} className="text-charcoal" />
              </label>
            </div>
            <div className="drawer-side ">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="text-gunmetal bg-santas menu relative min-h-full w-80 p-4 font-bold">
                <div className="pt-10">
                  {userData?.isHRAdmin == true ? (
                    <>
                      <li>
                        <Link
                          className="hover:text-provincial"
                          href="/employee"
                        >
                          Employee
                        </Link>
                      </li>
                      <li className="hover:text-provincial">
                        <Link href="/attendance">Attendance</Link>
                      </li>
                    </>
                  ) : null}
                  <li>
                    <Link
                      className="hover:text-provincial"
                      href="/leave-request"
                    >
                      Leave Request
                    </Link>
                  </li>
                  {userLocalStorage.isClockedIn ? null : (
                    <li>
                      <Link className="hover:text-provincial" href="/clock-in">
                        Clock In
                      </Link>
                    </li>
                  )}
                  {userLocalStorage.isClockedOut ? null : (
                    <li>
                      <Link className="hover:text-provincial" href="/clock-out">
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
                  <label htmlFor="my-drawer">
                    <MdClose size={25} className="hover:text-provincial" />
                  </label>
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
