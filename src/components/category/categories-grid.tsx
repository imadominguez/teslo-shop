import { getProductImageRandomByCategorie } from '@/actions';
import Link from 'next/link';
import { ProductImage } from '@/components';
import { font } from '@/config/fonts';

export const CategoriesGrid = async () => {
  const { men, women, ok, kid } = await getProductImageRandomByCategorie();
  return (
    <div
      className={`${font.className} fade-in mx-auto my-10 mt-5 grid max-w-6xl grid-cols-1 gap-5 px-5  sm:grid-cols-3 md:my-14 lg:my-20`}
    >
      <div className="col-span-1 overflow-hidden rounded   ">
        <Link href={`/gender/men`} className="group relative block ">
          <div className="group relative h-[20dvh] overflow-hidden  sm:h-[250px]">
            <ProductImage
              width={300}
              height={300}
              src={men[0].ProductImage[0].url}
              alt=""
              className=" h-full w-full object-cover transition-all duration-300 group-hover:scale-110 "
            />
            <span className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-transparent to-black"></span>
            <span className="absolute bottom-10 left-0 right-0 z-20 w-full text-center text-3xl font-bold text-white md:text-5xl">
              Hombres
            </span>
          </div>
        </Link>
      </div>
      <div className="col-span-1 overflow-hidden rounded   ">
        <Link href={`/gender/women`} className="group relative block ">
          <div className="group relative h-[20dvh] overflow-hidden  sm:h-[250px]">
            <ProductImage
              width={300}
              height={300}
              src={women[0].ProductImage[0].url}
              alt=""
              className=" h-full w-full object-cover transition-all duration-300 group-hover:scale-110 "
            />
            <span className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-transparent to-black"></span>
            <span className="absolute bottom-10 left-0 right-0 z-20 w-full text-center text-3xl font-bold text-white md:text-5xl">
              Mujeres
            </span>
          </div>
        </Link>
      </div>
      <div className="col-span-1 overflow-hidden rounded   ">
        <Link href={`/gender/kid`} className="group relative block ">
          <div className="group relative h-[20dvh] overflow-hidden  sm:h-[250px]">
            <ProductImage
              width={300}
              height={300}
              src={kid[0].ProductImage[0].url}
              alt=""
              className=" h-full w-full object-cover transition-all duration-300 group-hover:scale-110 "
            />
            <span className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-transparent to-black"></span>
            <span className="absolute bottom-10 left-0 right-0 z-20 w-full text-center text-3xl font-bold text-white md:text-5xl">
              Nenes
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
