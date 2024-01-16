import Link from "next/link";
import Image from "next/image";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import { IoCartOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: Props) {
  const { id } = params;

  // TODO: verificar que el id corresponde al usuario logueado
  // redirect('/')
  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col ">
        <Title title={`Orden #${id}`} />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 ">
          <div className="mt-5 flex flex-col ">
            <div
              className={clsx(
                "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                {
                  "bg-red-500": true,
                  "bg-green-500": false,
                },
              )}
            >
              <IoCartOutline size={30} />
              <span className="mx-2">Prendiente de pago</span>
              {/* <span>Compra efectuada !</span> */}
            </div>

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
              <div
                className={clsx(
                  "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                  {
                    "bg-red-500": true,
                    "bg-green-500": false,
                  },
                )}
              >
                <IoCartOutline size={30} />
                <span className="mx-2">Prendiente de pago</span>
                {/* <span>Compra efectuada !</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
