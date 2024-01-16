import Link from "next/link";
import Image from "next/image";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
];

export default function CartPage() {
  // TODO: Redireccionar si el carrito esta vacio
  // redirect("/empty");

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col ">
        <Title title="Carrito de compra" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 ">
          {/* Carrito */}
          <div className="mt-5 flex flex-col ">
            <span className="text-xl">Agregar mas items</span>
            <Link href={"/"} className="mb-5 underline">
              Continua comprando
            </Link>

            {/* items del carrito */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="mb-5 flex">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{ width: "100px", height: "100px" }}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <QuantitySelector quantity={3} />

                  <button className="mt-3 underline">Remover</button>
                </div>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className=" h-fit rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No Productos</span>
              <span className="text-right">3 articulos</span>
              <span>Subtotal</span>
              <span className="text-right">$ 100.00</span>
              <span>Impuestos{"15%"}</span>
              <span className="text-right">$ 100.00</span>
              <span className="mt-5 text-2xl">Total: </span>
              <span className="mt-5 text-right text-xl">$ 100.00</span>
            </div>

            <div className="mb-2 mt-5 w-full">
              <Link
                href={"/checkout/address"}
                className="btn-primary flex justify-center"
              >
                Chekout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
