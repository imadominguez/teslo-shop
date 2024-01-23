export interface Product {
  id: string; // Identificador único del producto
  description: string; // Descripción del producto
  images: string[]; // Array de rutas de las imágenes del producto
  inStock: number; // Cantidad disponible en stock
  price: number; // Precio del producto
  sizes: Size[]; // Tallas disponibles para el producto
  slug: string; // Slug único para la URL
  tags: string[]; // Etiquetas asociadas al producto
  title: string; // Título del producto
  // TODO: type: Type;        // Tipo de producto (pendiente de implementar)
  gender: Category; // Género al que está destinado el producto
}

export interface CartProduct {
  id: string; // Identificador único del producto en el carrito
  slug: string; // Slug único del producto
  title: string; // Título del producto en el carrito
  price: number; // Precio unitario del producto en el carrito
  quantity: number; // Cantidad de este producto en el carrito
  size: Size; // Talla del producto en el carrito
  image: string; // Ruta de la imagen del producto en el carrito
}

export type Category = 'men' | 'women' | 'kid' | 'unisex'; // Categoría del producto
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'; // Talla del producto
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats'; // Tipo de producto
