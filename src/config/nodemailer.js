import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

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

const sendMailToRegister = (userMail, token) => {
  const confirmUrl = `${process.env.URL_FRONTEND.replace(/\/$/, '')}/confirmar/${token}`;
  
  const mailOptions = {
    from: 'admin@epn.edu.ec',
    to: userMail,
    subject: "❤️🔥 AmiKuna 🔥 ❤️ - Confirma tu cuenta",
    html: `
      <p>Hola,</p>
      <p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
      <a href="${confirmUrl}">${confirmUrl}</a>
      <hr>
      <footer>El equipo de AmiKuna te da la más cordial bienvenida.</footer>
    `
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error("❌ Error al enviar correo de confirmación:", error);
    } else {
      console.log("✅ Correo de confirmación enviado:", info.messageId);
    }
  });
};

const sendMailToRecoveryPassword = async (userMail, token) => {
  const recoveryUrl = `${process.env.URL_FRONTEND.replace(/\/$/, '')}/recuperarpassword/${token}`;
  
  const info = await transporter.sendMail({
    from: 'admin@epn.edu.ec',
    to: userMail,
    subject: "🔐 Recupera tu contraseña - AmiKuna",
    html: `
      <p>Hola,</p>
      <p>Haz clic en el siguiente enlace para reestablecer tu contraseña:</p>
      <a href="${recoveryUrl}">${recoveryUrl}</a>
      <hr>
      <footer>El equipo de AmiKuna te acompaña en todo momento.</footer>
    `
  });

  console.log("✅ Correo de recuperación enviado:", info.messageId);
};

export {
  sendMailToRegister,
  sendMailToRecoveryPassword
};
