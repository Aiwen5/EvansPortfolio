import { json, type RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return json({ message: 'All fields are required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'schatzdesigns7@gmail.com',
      subject: `New Message from ${name}`,
      text: `From: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return json({ message: 'Internal Server Error' }, { status: 500 });
  }
};