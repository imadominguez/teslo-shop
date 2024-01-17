import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
];

export default function CheckoutPage() {
  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col ">
        <Title title="Verificar Orden" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 ">
          {/* Carrito */}
          <div className="mt-5 flex flex-col ">
            <span className="text-xl">Ajustar elementos</span>
            <Link href={"/cart"} className="mb-5 underline">
              Editar carrito
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
                  <p>{product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className="flex flex-col rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl">Direccion de entrega</h2>
            <div className="mb-10 flex flex-col font-bold">
              <p className="text-xl">Imanol Dominguez</p>
              <small>Calle falsa 123</small>
              <small>CABA</small>
              <small>Argentina</small>
              <small>CP: 7400</small>
              <small>+54 11 12345678</small>
            </div>

            {/* Divider */}

            <div className="mb-10 h-0.5 w-full rounded bg-gray-200" />

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
              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  Al hacer click en "Colocar Orden", aceptas nuestros{" "}
                  <a href="" className="underline">
                    Terminos y Condiciones
                  </a>{" "}
                  y{" "}
                  <a href="" className="underline">
                    politica de privacidad
                  </a>
                </span>
              </p>

              <Link
                href={"/orders/123"}
                className="btn-primary flex justify-center"
              >
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
