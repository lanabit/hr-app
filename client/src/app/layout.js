'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserContext } from '../supports/context/userContext';
import { useState } from 'react';
import Navbar from '../components/cores/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [userData, setUserData] = useState(null);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <html lang="en">
        <body className={inter.className}>
          <ToastContainer />
          <div className="flex h-[100vw]">
            <div className="fixed left-0 top-0">
              <Navbar />
            </div>
            <ProtectedRoute>
              <div className="pl-[200px] pt-[50px]">{children}</div>
            </ProtectedRoute>
          </div>
        </body>
      </html>
    </UserContext.Provider>
  );
}
