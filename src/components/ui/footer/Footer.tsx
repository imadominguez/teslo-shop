import { font } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="mb-10 flex w-full justify-center text-center">
      <Link href={"/"}>
        <span className={`${font.className} font-bold antialiased`}>
          Teslo |
        </span>
        <span> shop</span>
        <span> c</span>
        <span> {new Date().getFullYear()}</span>
      </Link>
      <Link href={"/"} className="mx-3">
        Privacidad & legal
      </Link>
      <Link href={"/"} className="mx-3">
        Ubicaciones
      </Link>
    </footer>
  );
};
