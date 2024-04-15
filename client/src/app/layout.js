'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserContext } from '@/supports/context/userContext';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [userData, setUserData] = useState(null);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <html lang="en">
        <body className={inter.className}>
          <div>
            <Navbar />
            {children}
          </div>
        </body>
      </html>
    </UserContext.Provider>
  );
}
