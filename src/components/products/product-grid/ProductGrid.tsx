import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';

// Propiedades esperadas para el componente ProductGrid
interface Props {
  products: Product[];
}

// Componente ProductGrid que muestra una cuadrícula de productos
export const ProductGrid = ({ products }: Props) => {
  return (
    // Contenedor de la cuadrícula con clases de diseño responsivo y espacio entre elementos
    <div className="mb-10 grid grid-cols-1 gap-10 px-7 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {/* Mapeo de la lista de productos para mostrar cada elemento en un ProductGridItem */}
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
