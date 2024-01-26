'use server';

import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return 'Success';
  } catch (error) {
    if ((error as AuthError).type === 'CredentialsSignin') {
      return 'Credenciales incorrectas';
    }

    return 'Error inesperado';
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password });

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo iniciar sesión',
    };
  }
};
