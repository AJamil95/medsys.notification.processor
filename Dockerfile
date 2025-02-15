# Uso de la imagen oficial de Node.js como imagen base
FROM node:latest

# Crear y configurar el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# variables de entorno kafka
ENV MAIL_HOST=YourMailHost
ENV MAIL_PORT=YourMailPort
ENV MAIL_USER=YourMailUsername
ENV MAIL_PASSWORD=YourMailPassword
ENV SERVICE_BUS_CONNECTION_STRING=YourServiceBusConnectionString
ENV SERVICE_BUS_QUEUE_NAME=YourQueueName

# Command to run the app
CMD ["node", "server.js"]

