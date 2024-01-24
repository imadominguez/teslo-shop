import { font } from '@/config/fonts';

import LoginForm from './ui/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <h1 className={`${font.className} mb-5 text-4xl`}>Ingresar</h1>

      <LoginForm />
    </main>
  );
}
