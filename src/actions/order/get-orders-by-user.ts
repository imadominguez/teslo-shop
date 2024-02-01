'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
export const getOrdersByUser = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        ok: false,
        message: 'No hay sesion activa',
      };
    }

    // Si el role del usuario es admin, se puede obtener todas las ordenes
    if (session.user.role === 'admin') {
      const orders = await prisma.order.findMany({
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
      const orderWithName = orders.map((order) => {
        const { OrderAddress, ...restOrder } = order;
        return {
          ...restOrder,
          name: OrderAddress!.firstName + ' ' + OrderAddress!.lastName,
        };
      });
      return {
        ok: true,
        orders: orderWithName,
      };
    }

    // Si el role del usuario es usuario, se puede obtener solo las ordenes del usuario actual
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
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

    const orderWithName = orders.map((order) => {
      const { OrderAddress, ...restOrder } = order;
      return {
        ...restOrder,
        name: OrderAddress!.firstName + ' ' + OrderAddress!.lastName,
      };
    });
    return {
      ok: true,
      orders: orderWithName,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No hay ordenes',
    };
  }
};
