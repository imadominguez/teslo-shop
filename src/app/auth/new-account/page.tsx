import { Metadata } from 'next';
import { font } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';
import { ThemeButton } from '@/components/ui/top-menu/ThemeButton';

export const metadata: Metadata = {
  title: 'Crear nueva cuenta',
  description:
    'Crea una nueva cuenta en Teslo Shop para acceder a ofertas exclusivas, realizar compras más rápidas y gestionar tu perfil de usuario.',
  keywords:
    'teslo shop, crear cuenta, registrarse, compras en línea, perfil de usuario',
};

export default function NewAccountPage() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <h1
        className={`${font.className} mb-5 flex items-center justify-between text-4xl`}
      >
        Nueva cuenta <ThemeButton />
      </h1>

      <RegisterForm />
    </main>
  );
}
