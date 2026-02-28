const { Resend } = require('resend');

// Inizializza Resend con la chiave che hai messo su Netlify
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  // 1. Recupera i dati del form inviati da Netlify
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
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; color: #333; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #0A001B;">Grazie per avermi contattato!</h2>
          <p>Ciao <strong>${name}</strong>,</p>
          <p>Ti confermo di aver ricevuto correttamente la tua richiesta.</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-style: italic;">" ${message} "</p>
          </div>
          <p>Ti risponderò al più presto all'indirizzo <strong>${email}</strong>.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">
            Questa è una risposta automatica. Per favore, non rispondere direttamente a questa email.
          </p>
        </div>
      `,
    });

    return { statusCode: 200, body: "Email inviata!" };
  } catch (error) {
    console.error("Errore invio mail:", error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};