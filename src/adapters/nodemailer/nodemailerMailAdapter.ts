import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mailAdapter";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "07a2b19d752e24",
      pass: "224706dfda829a"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget  <oi@feedget.com>',
            to: 'Plínio <pliniohrcode@gmail.com>',
            subject,
            html: body,
        });
    };
}