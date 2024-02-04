'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
export const getPaginatedOrders = async () => {
  try {
    const session = await auth();
    if (session?.user.role !== 'admin') {
      return {
        ok: false,
        message: 'El usuario no es administrador',
      };
    }

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (!orders) {
      throw 'No hay ordenes';
    }

    return {
      ok: true,
      orders: orders,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No hay ordenes',
    };
  }
};
