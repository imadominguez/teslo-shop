export const revalidate = 0;

import Link from 'next/link';
import { Title } from '@/components';
import { IoCardOutline } from 'react-icons/io5';
import { getPaginatedUsers } from '@/actions';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

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
