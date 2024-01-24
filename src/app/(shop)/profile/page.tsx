import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect('/');
  }

  return (
    <div>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
}
