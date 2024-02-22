'use client';
import { useSearchParams } from 'next/navigation';

export default function VerifyAccountPage() {
  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  //  TODO: hacer ui de pagina
  // TODO: hacer funcionalidad de verificar la cuenta,
  // ? verificar si existe el usuario con el email en la base de datos
  // ? verificar si el usuario esta verificado, si no esta verificado, verificarlo y enviar un email de verificacion, si esta verificado, enviar un email de bienvenida.
  // ? si esta verificado, redireccionar a la pagina de inicio.
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
