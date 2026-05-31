import { Resend } from 'resend';

// Inizializzo Resend con la chiave che hai messo su Netlify
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  // Recupero i dati del form inviati da Netlify
  const { payload } = JSON.parse(event.body);
  const { email, name, message } = payload.data;

  console.log(`Ricevuto messaggio da: ${name} (${email})`);

  try {
    // 2. Invia l'email di conferma all'utente
    await resend.emails.send({
      from: 'Davide Ferraro <noreply@davide-ferraro.it>',
      to: [email],
      subject: `Ciao ${name}, ho ricevuto il tuo messaggio!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
            .body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 30px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            
            /* Header ridotto con allineamento immagine */
            .header { background-color: #0A001B; padding: 25px 20px; text-align: center; }
            
            /* Container dei Divider per evitare spazi bianchi */
            .divider { line-height: 0; font-size: 0; background-color: #ffffff; }
            
            .content { padding: 10px 40px 40px 40px; color: #0A001B; line-height: 1.6; background-color: #ffffff; }
            .footer { background-color: #0A001B; color: #ffffff; padding: 15px; text-align: center; font-size: 12px; }
            .button { display: inline-block; padding: 14px 30px; background-color: #A855F7; color: #0A001B !important; text-decoration: none; border-radius: 50px; font-weight: bold; margin-top: 20px; }
            .highlight { color: #A855F7; font-weight: bold; }
            .message-box { background-color: #f9f7ff; border-left: 4px solid #7C3AED; padding: 20px; margin: 25px 0; border-radius: 0 12px 12px 0; }
        </style>
        </head>
        <body class="body">
        <div class="container">
            
            <div class="header">
            <div style="display: inline-block; vertical-align: middle;">
                <img src="https://davide-ferraro.it/davide.png" alt="Logo" style="height: 40px; width: auto; vertical-align: middle; margin-right: 10px;">
                <span style="color: #ffffff; font-size: 20px; font-weight: bold; letter-spacing: -1px; vertical-align: middle;">
                Davide Ferraro
                </span>
            </div>
            </div>

            <div class="divider">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 0 1587 79" preserveAspectRatio="none" style="display: block; width: 100%; height: 60px;">
                <path d="M-100 79C-100 79 218.416 23.165 693.5 23.165C1168.58 23.165 1487 79 1487 79V0H-100V79Z" fill="#0A001B"></path>
            </svg>
            </div>

            <div class="content">
            <h2 style="margin-top: 10px;">Ciao <span class="highlight">${name}</span>!</h2>
            <p>Ho ricevuto correttamente il tuo messaggio. Ecco una copia per tuo riferimento:</p>
            
            <div class="message-box">
                <p style="margin: 0; font-style: italic; color: #4B5563;">"${message}"</p>
            </div>

            <p>Ti risponderò molto presto. Nel frattempo, puoi visitare di nuovo il mio sito.</p>
            <a href="https://davide-ferraro.it" class="button">Torna al sito</a>
            </div>

            <div class="divider">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 0 1587 79" preserveAspectRatio="none" style="display: block; width: 100%; height: 60px;">
                <path d="M-100 0C-100 0 218.416 55.835 693.5 55.835C1168.58 55.835 1487 0 1487 0V79H-100V0Z" fill="#0A001B"></path>
            </svg>
            </div>

            <div class="footer">
            <p style="margin: 0;">© 2026 Davide Ferraro — Sviluppatore</p>
            <p style="margin-top: 10px; opacity: 0.7;">Inviato da noreply@davide-ferraro.it</p>
            </div>

        </div>
        </body>
        </html>
      `,
    });

    return { statusCode: 200, body: "Email inviata!" };
  } catch (error) {
    console.error("Errore invio mail:", error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};