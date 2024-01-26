'use client';

import type { Country } from '@/interfaces';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
}

interface Props {
  countries?: Country[];
}
export const AddressForm = ({ countries }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      // TODO: leer de la base de datos
    },
  });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5"
    >
      <div className="mb-2 flex flex-col">
        <span>Nombres</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register('firstName', { required: true })}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Apellidos</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register('lastName', { required: true })}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Dirección</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register('address', { required: true })}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register('address2')}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Código postal</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register('postalCode', { required: true })}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Ciudad</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register('city', { required: true })}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>País</span>
        <select
          className="rounded-md border bg-gray-200 p-2"
          {...register('country', { required: true })}
        >
          <option value="">[ Seleccione ]</option>

          {countries?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2 flex flex-col">
        <span>Teléfono</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register('phone', { required: true })}
        />
      </div>

      <div className="mb-2 flex flex-col sm:mt-1">
        <div className="mb-10 inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register('rememberAddress')}
            />
            <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>Recordar direccion?</span>
        </div>

        <button
          disabled={!isValid}
          type="submit"
          className={clsx('flex w-full justify-center sm:w-1/2 ', {
            'btn-primary': isValid,
            'btn-disable': !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
