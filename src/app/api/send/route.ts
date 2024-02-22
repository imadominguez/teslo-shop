import { EmailTemplate } from '@/components';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      text: 'Hello world',
      from: 'onboarding@resend.dev',
      to: 'imanol.desarrolloweb@gmail.com',
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
