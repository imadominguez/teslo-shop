import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | SHOP',
    default: 'Admin',
  },
  description:
    'Explora la página del administrador en Teslo SHOP y gestiona fácilmente tu sitio web. Accede a herramientas y funciones de administración para controlar y mejorar tu plataforma en línea.',
  keywords: 'admin, teslo, shop, administrador, gestión de sitio web',
};

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}
