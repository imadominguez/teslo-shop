// Importa la instancia de Prisma y los datos de prueba
import prisma from '../lib/prisma';
import { initialData } from './seed';

// Función principal para sembrar la base de datos
async function main() {
  // Borrar registros existentes en orden inverso para evitar problemas de restricciones de clave externa
  await prisma.userAddress.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  console.log('✅ Registros borrados');
  // Obtén los datos de prueba
  const { categories, products, users, countries } = initialData;

  // Crea registros de categorías
  const categoriesData = categories.map((category) => ({
    name: category,
  }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  // Obtiene las categorías desde la base de datos
  const categoriesDB = await prisma.category.findMany();
  // Crea un mapa para asignar nombres de categorías a identificadores de base de datos
  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    },
    {} as Record<string, string>,
  );

  // Para cada producto, crea registros en la base de datos y asocia imágenes
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    // Crea un nuevo producto en la base de datos
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // Crea registros de imágenes relacionadas con el producto
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));
    await prisma.productImage.createMany({
      data: imagesData,
    });
  });
  console.log('✅ Productos creados');
  users.forEach(async (user) => {
    await prisma.user.create({
      data: user,
    });
  });
  console.log('✅ Usuarios creados');

  countries.forEach(async (country) => {
    await prisma.country.create({
      data: country,
    });
  });
  console.log('✅ Countries creados');

  console.log(' ');
  console.log('✅ Seed ejecutado con éxito');
}

// Ejecuta la función main solo si no estamos en un entorno de producción
(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();
