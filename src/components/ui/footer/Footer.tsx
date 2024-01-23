import { font } from '@/config/fonts';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <footer className=" flex h-full w-full justify-center bg-gradient-to-t from-gray-500/30 to-transparent  py-24 text-center 2xl:bg-transparent">
      <Link href={'/'}>
        <span className={`${font.className} font-bold antialiased`}>
          Teslo |
        </span>
        <span> shop</span>
        <span> c</span>
        <span> {new Date().getFullYear()}</span>
      </Link>
      <Link href={'/'} className="mx-3">
        Privacidad & legal
      </Link>
      <Link href={'/'} className="mx-3">
        Ubicaciones
      </Link>
    </footer>
  );
};
