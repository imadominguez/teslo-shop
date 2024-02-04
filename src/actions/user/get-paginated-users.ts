'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Usuario no autorizado',
    };
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return {
      ok: true,
      users: users,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo obtener los usuarios',
    };
  }
};
