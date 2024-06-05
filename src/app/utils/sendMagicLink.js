import 'dotenv/config';

import nodemailer from 'nodemailer';

// Using mailtrap platform (development)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMagicLink({ email, magicLink }) {
  return await transporter.sendMail({
    to: email,
    encoding: 'utf-8',
    from: 'Nodejs Auth <nodejs-auth@no-reply.com>',
    subject: 'Autenticação - Nodejs passwordless',
    html: `
      <h1>Bem vindo(a) Continue usando a aplicação</h1>
      <p>
        Continue acessando a nossa plataforma através da confirmação por e-email, click
        no link abaixo e acesse sua conta
      </p>

      <a 
        href="${magicLink}"
        title="Acessar minha conta" 
        target="_blank"
        style="display: block; padding: 16px; border-radius: 5px; background-color: purple; color: white;"
      >
        Minha conta
      <a/>
    `,
  });
}
