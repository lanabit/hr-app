'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserContext } from '../supports/context/userContext';
import { useState } from 'react';
import Navbar from '../components/cores/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [userData, setUserData] = useState(null);
  const path = usePathname();
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen w-full">
            <ToastContainer />
            {path === '/login' ? null : (
              <div className="w-[5%] flex-auto">
                <Navbar />
              </div>
            )}
            <div className="bg-provincial flex w-[95%] flex-auto items-center justify-center">
              <ProtectedRoute>{children}</ProtectedRoute>
            </div>
          </div>
        </body>
      </html>
    </UserContext.Provider>
  );
}
