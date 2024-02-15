'use client';

import { changeUserRole } from '@/actions';
import type { User } from '@/interfaces';

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className=" dark:bg-dark-accent border-dark-accent border-b bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-4 text-left text-sm font-medium">
            Email
          </th>
          <th scope="col" className="px-6 py-4 text-left text-sm font-medium">
            Nombre completo
          </th>
          <th scope="col" className="px-6 py-4 text-left text-sm font-medium">
            Role
          </th>
          <th scope="col" className="px-6 py-4 text-left text-sm font-medium">
            Cambiar Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="dark:bg-dark-second border-dark-accent  dark:hover:bg-dark border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium ">
              {user.email}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-light ">
              {user.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-light capitalize ">
              {user.role}
            </td>
            <td className="flex items-center whitespace-nowrap  px-6 py-4 text-sm font-light ">
              <select
                value={user.role}
                onChange={(e) => changeUserRole(user.id, e.target.value)}
                className="w-full p-2 text-sm "
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
