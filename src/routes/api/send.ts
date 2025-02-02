import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';

import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: 'schatzdesigns7@gmail.com',
    subject: `New Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return json({ message: 'Failed to send email' }, { status: 500 });
  }
}