'use server';
import prisma from '@/lib/prisma';

export const getProductImageRandomByCategorie = async () => {
  try {
    const productsMen = await prisma.product.findMany({
      where: {
        gender: 'men',
      },
      skip: Math.floor(Math.random() * (10 - 5 + 1)) + 5,
      take: 2,
      select: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
    });

    const productsWomen = await prisma.product.findMany({
      where: {
        gender: 'women',
      },
      skip: Math.floor(Math.random() * (10 - 5 + 1)) + 5,
      take: 2,
      select: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
    });
    const productsKid = await prisma.product.findMany({
      where: {
        gender: 'kid',
      },
      skip: Math.floor(Math.random() * (10 - 5 + 1)) + 5,
      take: 2,
      select: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
    });
    return {
      ok: true,
      men: productsMen,
      women: productsWomen,
      kid: productsKid,
    };
  } catch (error) {
    return {
      ok: false,
      men: [],
      women: [],
      kid: [],
      message: 'Error al obtener los productos',
    };
  }
};
