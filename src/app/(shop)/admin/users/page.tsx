export const revalidate = 0;

import { Title } from '@/components';
import { getPaginatedUsers } from '@/actions';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | SHOP',
    default: 'Mantenimiento de usuarios',
  },
  description:
    'Explora la página de administración en Teslo SHOP y gestiona fácilmente todos los usuarios registrados en tu plataforma. Accede a información detallada de los usuarios y administra sus cuentas para ofrecer una experiencia de usuario óptima.',
  keywords:
    'Usuarios, Teslo, Shop, Administrador, gestión de usuarios, cuentas de usuario',
};

export default async function OrdersPageAdmin() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Todos los usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
