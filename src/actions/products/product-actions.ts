'use server';
import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWidthImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(page)) {
    page = 1;
  }
  if (page < 1) {
    page = 1;
  }

  try {
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2, // solo tomar 2 imagenes
          select: {
            url: true,
          },
        },
      },
      skip: (page - 1) * take,
      take: take,
      where: {
        gender: gender,
      },
    });

    // 2. Obtener la cantidad de paginas
    const count = await prisma.product.count({
      where: {
        gender: gender,
      },
    });
    const pages = Math.ceil(count / take);

    return {
      currentPage: page,
      totalPages: pages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error('no se pudo cargar');
  }
};
