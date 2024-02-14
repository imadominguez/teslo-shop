import Image from 'next/image';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';

export const metadata: Metadata = {
  title: 'Perfil de Usuario',
  description: 'Información del perfil de usuario en nuestro sitio web.',
  keywords: 'perfil, usuario, información, cuenta, datos personales',
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect('/');
  }

  const { email, name, role, emailVerifed, image } = session.user;

  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="dark:bg-dark-second max-w-md rounded-lg bg-gray-200 p-5 shadow-xl">
        <div className="p-2">
          <Image
            width={100}
            height={100}
            className="mx-auto h-32 w-32 rounded-full"
            src={image ?? '/imgs/placeholder.jpg'}
            alt="John Doe"
          />
        </div>
        <div className="p-2">
          <h3 className="text-center text-xl font-medium leading-8 ">{name}</h3>

          <table className="text-md my-3">
            <tbody>
              <tr>
                <td className="px-2 py-2 font-semibold ">Rol</td>
                <td className="px-2 py-2 capitalize">{role}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 font-semibold ">Email</td>
                <td className="px-2 py-2">{email}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 font-semibold ">Email Verificado</td>
                <td className="px-2 py-2">{emailVerifed ? 'Si' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
