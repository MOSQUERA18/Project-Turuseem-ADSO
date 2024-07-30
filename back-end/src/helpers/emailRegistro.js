import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { Cor_User, Nom_User, token } = datos;

  const mailOptions = {
    from: "SENA EMPRESA - LA GRANJA <tu_correo@ejemplo.com>",
    to: Cor_User,
    subject: "Comprueba tu cuenta en TURUSEEM",
    text: "Confirma tu cuenta en TURUSEEM",
    html: `<p>Hola ${Nom_User}, comprueba tu cuenta en TURUSEEM</p>
           <p>Tu cuenta ya está lista, pero debes comprobarla en el siguiente enlace: 
           <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
           <p>Si tú no creaste esta cuenta, ignora este mensaje</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mensaje enviado: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
