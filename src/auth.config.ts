import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',

    newUser: '/auth/new-account',

    signOut: '/auth/logout',
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;
        // Buscar el correo
        const { email, password } = parsedCredentials.data;
        console.log('AuthConfig');
        console.log({ email, password });
        // Verificar que los datos ingresados en el formulario
        // sean correctos y que el usuario exista en la base de datos
        // const user = await prisma.user.findUnique({})

        // Retornar el usuario
        return null;
      },
    }),
  ],
};

export const { signIn, signOut } = NextAuth(authConfig);
