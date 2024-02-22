import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      text: 'Hello world',
      from: 'onboarding@resend.dev',
      to: 'imanol.desarrolloweb@gmail.com',
      subject: 'Hello world',
      react: EmailTemplate({
        firstName: 'John',
        email: 'imanol.desarrolloweb@gmail.com',
      }),
    });

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
