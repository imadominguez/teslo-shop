import { font } from "@/config/fonts";
import Link from "next/link";

export default function () {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <h1 className={`${font.className} mb-5 text-4xl`}>Nueva cuenta</h1>

      <div className="flex flex-col">
        <label htmlFor="text">Nombre completo</label>
        <input
          className="mb-5 rounded border bg-gray-200 px-5 py-2"
          type="text"
        />
        <label htmlFor="email">Correo electronico</label>
        <input
          className="mb-5 rounded border bg-gray-200 px-5 py-2"
          type="email"
        />
        <label htmlFor="email">Contraseña</label>
        <input
          className="mb-5 rounded border bg-gray-200 px-5 py-2"
          type="email"
        />

        <button className="btn-primary">Crear cuenta</button>

        {/* divisor l ine */}
        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Ingresar
        </Link>
      </div>
    </main>
  );
}
