// src/mailer.ts
import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// verify connection configuration (optional but useful)
transporter.verify(function (error: Error | null, success: boolean) {
  console.log('Verifying mailer transporter...');
  console.log(`SMTP Host: ${process.env.SMTP_HOST}`);
  console.log(`SMTP Port: ${process.env.SMTP_PORT}`);
  console.log(`SMTP Secure: ${process.env.SMTP_SECURE}`);
  if (error) {
    console.error('Mailer transporter verification failed:', error);
  } else {
    console.log('Mailer transporter is ready to send emails');
  }
});

interface SendMailParams {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: SendMailOptions['attachments'];
}

export default async function sendMail({
  to,
  subject,
  text,
  html,
  attachments,
}: SendMailParams): Promise<SentMessageInfo> {
  try {
    const from = process.env.FROM_NAME
      ? `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`
      : process.env.FROM_EMAIL;

    const mailOptions: SendMailOptions = {
      from,
      to,
      subject,
      text: text || undefined,
      html: html || undefined,
      attachments: attachments || [],
    };

    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('Preview URL: %s', previewUrl);
    }

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}