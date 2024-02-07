import { font } from '@/config/fonts';

import LoginForm from './ui/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description:
    'Inicia sesión en Teslo Shop para acceder a tu cuenta, realizar compras y administrar tus pedidos y detalles de perfil.',
  keywords:
    'teslo shop, iniciar sesión, cuenta de usuario, compras en línea, seguridad',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <h1 className={`${font.className} mb-5 text-4xl`}>Ingresar</h1>

      <LoginForm />
    </main>
  );
}
