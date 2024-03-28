

import React from 'react';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider/AuthProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OnlineStore',
  description: 'Welcome to store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: inter.className}}>
     
        <AuthProvider>
        <Navbar />
          <div>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
