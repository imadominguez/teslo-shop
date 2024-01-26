import { font } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <h1 className={`${font.className} mb-5 text-4xl`}>Nueva cuenta</h1>

      <RegisterForm />
    </main>
  );
}
