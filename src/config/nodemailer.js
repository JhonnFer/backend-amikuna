import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// CORS configurado para permitir frontend Vercel
app.use(cors({
  origin: 'https://amikuna.vercel.app', // Cambia por la URL de tu frontend
  methods: ['GET', 'POST'],
}));

// Configuración nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  }
});

const URL_FRONTEND = "https://amikuna.vercel.app"; // URL fija del frontend

// Ruta para recuperar password
app.post('/recuperarpassword', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: 'El correo es obligatorio' });
  }

  try {
    // Aquí deberías buscar si el usuario existe, generar token, guardarlo, etc.
    // Por simplicidad vamos a simular un token generado
    const token = '123456abcdef';

    // Crear link para recuperación de contraseña
    const recoveryLink = `${URL_FRONTEND}/recuperarpassword/${token}`;

    // Configurar mail
    const mailOptions = {
      from: 'admin@epn.edu.ec',
      to: email,
      subject: 'Correo para reestablecer tu contraseña',
      html: `
        <h1>❤️🔥 AmiKuna 🔥❤️</h1>
        <hr>
        <p>Haz clic <a href="${recoveryLink}">aquí</a> para reestablecer tu contraseña.</p>
        <hr>
        <footer>El equipo de AmiKuna te da la más cordial bienvenida.</footer>
      `
    };

    // Enviar mail
    await transporter.sendMail(mailOptions);

    return res.json({ msg: 'Correo enviado, revisa tu bandeja de entrada' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return res.status(500).json({ msg: 'Error interno enviando correo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
