import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          // type: "OAuth2",
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
    });

    const { correo, nombreCompleto, token } = datos;    
    // Enviar el email
    const info = await transport.sendMail({
      from: "AEC - Administrador de ECommerce Articulos",
      to: correo,
      subject: 'Comprueba tu cuenta en AEC',
      text: 'Comprueba tu cuenta en AEC',
      html: `<p>Hola: ${nombreCompleto}, comprueba tu cuenta en AEC.</p>
               <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
               
               <a href="${process.env.FRONTEND_URL}/api/auth/${token}">Comprobar Cuenta</a></p>

               <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
               `
    });

   // console.log("Mensaje enviado: %s", info.messageId);

};


export default emailRegistro;