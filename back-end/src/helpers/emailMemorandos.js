import nodemailer from "nodemailer";

export const emailMemorandos = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const {
    Cor_Aprendiz,
    Nom_Aprendiz,
    Tot_Memorandos,
    Nom_TalentoHumano,
    Nom_ProgramaFormacion,
    trimestreActual,
    añoActual,
  } = datos;
  // Enviar Email

  const mailOptions = {
    from: "SENA EMPRESA - LA GRANJA",
    to: Cor_Aprendiz,
    subject: `Memorando #${Tot_Memorandos}`,
    text: "Reestablece tu Contraseña",
    html: `
            <p>Buen dia ${Nom_Aprendiz}, recibe un cordial saludo.</p>
            <p>
                A continuacion adjunto su ${Tot_Memorandos} memorando de Sena Empresa, tienes
                48 horas para responder por escrito o presentar excusa, recuerda que despues del
                segundo memorando recibes comité disciplinario.
            </p>
            <p>
                ${Nom_TalentoHumano}
            </p>
            <p>
                LIDER TALENTO HUMANO
            </p>
            <p>
                ${Nom_ProgramaFormacion}
            </p>
            <p>
                ${trimestreActual} TRIMESTRE SENA EMPRESA ${añoActual}
            </p>
        `,
        attachments: [
          {
            filename: `Memorando #${Tot_Memorandos}.pdf`,
            path: "path/to/pdf",
            contentType: "application/pdf"
          }
        ]
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("Mensaje enviado: %s", info.messageId);
    }
  });
};
