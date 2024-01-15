import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = params;
  if (!id) {
    notFound();
  }
  const products = seedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "para Hombres",
    women: "para Mujeres",
    kid: "para Niños",
    unisex: "para Unisex",
  };

  const subtitleLabel: Record<Category, string> = {
    men: "Productos para él",
    women: "Productos para ella",
    kid: "Productos para los mas chicos",
    unisex: "Todos los productos para Unisex",
  };
  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Articulos ${labels[id]}`}
        subtitle={subtitleLabel[id]}
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
