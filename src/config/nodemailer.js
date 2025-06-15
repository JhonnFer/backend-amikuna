// config/nodemailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const URL_FRONTEND = process.env.URL_FRONTEND || "https://amikuna.vercel.app";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

const sendMailToRegister = async (userMail, token) => {
  const confirmURL = `${URL_FRONTEND}/confirmar/${token}`;
  let mailOptions = {
    from: 'admin@epn.edu.ec',
    to: userMail,
    subject: "❤️🔥 AmiKuna 🔥❤️",
    html: `
      <p>Hola, haz clic <a href="${confirmURL}">aquí</a> para confirmar tu cuenta.</p>
      <hr>
      <footer>El equipo de AmiKuna te da la más cordial bienvenida.</footer>
    `
  };

  await transporter.sendMail(mailOptions);
}

const sendMailToRecoveryPassword = async (userMail, token) => {
  const recoveryURL = `${URL_FRONTEND}/recuperarpassword/${token}`;
  let mailOptions = {
    from: 'admin@epn.edu.ec',
    to: userMail,
    subject: "Reestablecer tu contraseña - AmiKuna",
    html: `
      <h1>❤️🔥 AmiKuna 🔥❤️</h1>
      <p>Haz clic en el siguiente enlace para reestablecer tu contraseña:</p>
      <a href="${recoveryURL}">${recoveryURL}</a>
      <hr>
      <footer>El equipo de AmiKuna te acompaña en tu camino de recuperación.</footer>
    `
  };

  await transporter.sendMail(mailOptions);
}

export {
  sendMailToRegister,
  sendMailToRecoveryPassword
};
