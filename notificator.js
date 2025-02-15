const nodemailer = require('nodemailer');
require('dotenv').config();
const { ServiceBusClient } = require('@azure/service-bus');

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const queueName = process.env.SERVICE_BUS_QUEUE_NAME;

const sbClient = new ServiceBusClient(connectionString);
const receiver = sbClient.createReceiver(queueName);


const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });


const notification = async () => {
  try {
    console.log('Notificador: Esperando mensajes desde Service Bus...');
    
    const messages = await receiver.receiveMessages(1);
    
    if (messages.length > 0) {
      const message = messages[0];
      const parsedMessage = JSON.parse(message.body.toString());

      console.log(`Mensaje recibido: ${JSON.stringify(parsedMessage, null, 2)}`);
      
      await sendEmail(parsedMessage.patientId);

      await receiver.completeMessage(message);
    } else {
      console.log('Notificador: Ningun mensaje recibido');
    }
  } catch (err) {
    console.error('Error al recibir un mensaje:', err);
  } finally {
    await receiver.close();
    await sbClient.close();
  }
};



const sendEmail = async (patientId) => {
  const email = getEmailByPatientId(patientId);

  if (!email) {
    console.log('Aviso: Paciente no encontrado');
    return;
  }

  const mailOptions = {
    from: 'notifications@medsys.com',
    to: email,
    subject: 'Confirmación de Cita',
    text: 'Por medio de la presente se confirma la cita registrada para el paciente Pepito Perez.',
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #007bff;">Confirmación de Cita</h2>
      <p>Por medio de la presente se confirma la cita registrada para el paciente <strong>Pepito Perez</strong>.</p>
      <p>Detalles de la Cita:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Fecha:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">01 de Febrero de 2025</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Hora:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">10:00 AM</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Consultorio:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">#305</td>
        </tr>
      </table>
      <p>Por favor, llegue 10 minutos antes de su cita.</p>
      <p style="margin-top: 20px;">Saludos,<br><em>Equipo MedSys</em></p>
    </div>
  `
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      console.log('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      console.log('Correo electrónico enviado con éxito');
    }
  });
};

function getEmailByPatientId(patientId) {
  const patients = {
    '1': 'paciente1@example.com',
    '2': 'paciente2@example.com'
  };
  return patients[patientId] || null;
}

module.exports = notification;
