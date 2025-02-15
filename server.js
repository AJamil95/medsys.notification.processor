const notification = require('./notificator');

const start = async () => {
  console.log(`medsys-notification-processor ejecutandose correctamente.`);
  try {
    await notification();
  } catch (err) {
    console.error('Error de ejecución medsys-notification-processor!!!!', err);
    process.exit(1);
  }
};

start();