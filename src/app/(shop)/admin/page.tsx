import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | SHOP',
    default: 'Admin',
  },
  description: 'Pagina del administrador del sitio web',
  keywords: 'admin, teslo, shop',
};

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}
