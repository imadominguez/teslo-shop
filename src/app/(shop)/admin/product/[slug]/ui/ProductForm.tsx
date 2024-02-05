'use client';

import { createUpdateProduct } from '@/actions';
import { Category, Product, ProductImage } from '@/interfaces';
import { Gender } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { Form, useForm } from 'react-hook-form';

interface Props {
  product: Product & { ProductImage?: ProductImage[] };
  categories: Category[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  tags: string;
  gender: Gender;
  sizes: string[];
  inStock: number;
  categoryId: string;

  // TODO: Imagenes
}

export const ProductForm = ({ product, categories }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(', '),
      sizes: product.sizes ?? [],

      // TODO: images
    },
  });
  watch('sizes');

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { ...productToSave } = data;

    formData.append('id', product.id ?? '');
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    const { ok } = await createUpdateProduct(formData);

    console.log(ok);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-16 grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-0"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="mb-2 flex flex-col">
          <span>Título</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register('title', { required: true })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Slug</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register('slug', { required: true })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="rounded-md border bg-gray-200 p-2"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="mb-2 flex flex-col">
          <span>Price</span>
          <input
            type="number"
            className="rounded-md border bg-gray-200 p-2"
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Tags</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register('tags', { required: true })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Gender</span>
          <select
            className="rounded-md border bg-gray-200 p-2"
            {...register('gender', { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="mb-2 flex flex-col">
          <span>Categoria</span>
          <select
            className="rounded-md border bg-gray-200 p-2"
            {...register('categoryId', { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((cat) => (
              <option className="capitalize" key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  'mb-2 mr-2 w-14 rounded-md bg-gray-300 p-2 text-center transition-all hover:cursor-pointer ',
                  {
                    '!bg-blue-500 text-white':
                      getValues('sizes').includes(size),
                  },
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="mb-2 flex flex-col">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="rounded-md border bg-gray-200 p-2"
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <Image
                  alt={product.title ?? ''}
                  src={`/products/${image.url}`}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />

                <button
                  type="button"
                  className="btn-danger w-full rounded-b-xl rounded-t-none "
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};