import { auth } from '@/auth.config';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect('/');
  }

  const { email, name, role, emailVerifed, image } = session.user;

  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="max-w-md rounded-lg bg-white p-5 shadow-xl">
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
          <h3 className="text-center text-xl font-medium leading-8 text-gray-900">
            {name}
          </h3>

          <table className="text-md my-3">
            <tbody>
              <tr>
                <td className="px-2 py-2 font-semibold text-gray-500">Rol</td>
                <td className="px-2 py-2 capitalize">{role}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 font-semibold text-gray-500">Email</td>
                <td className="px-2 py-2">{email}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 font-semibold text-gray-500">
                  Email Verificado
                </td>
                <td className="px-2 py-2">{emailVerifed ? 'Si' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
