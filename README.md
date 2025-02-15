# MEDSYS-NOTIFICATION-PROCESOR

API para envio de notificaciones con Express, Node.js y Mailtrap

## Descripción

Esta es una API RESTful para envio de notificaciones

## Tecnologías utilizadas

- Node.js
- Express
- Mailtrap

## Prerrequisitos

- [Node.js]

## Instalación

1. Clonar el repositorio:

```bash
   git clone https://enunezdev@dev.azure.com/enunezdev/MDEIS-V2E4/_git/medsys.notification.processor
   cd <NOMBRE_DEL_PROYECTO>
```

2. Instalar dependencias:

```bash
    npm install
```

3. Ejecutar el proyecto:

```bash
    node server.js
```

## Construir la imagen con Docker (WINDOWS)

**Prerequisitos**:

- [Docker Desktop]

#### Para construir la imagen:

- Ubicarse en el directorio raiz, para construir la imagen a partir del Dockerfile:

```bash
    docker build -t medsys-notification-procesor:1.0 .
```

#### Para ejecutar el contenedor:

- el siguiente comando ejecutara el contenedor a partir de la imagen creada en el paso anterior:

```bash
    docker run -d --rm -p 3500:3500 --name service-notification medsys-notification-procesor:1.0
```

#### Verificar la ejecución del contenedor:

- verificar que el contendor este ejecutandose:

```bash
    docker ps
```

## Uso

Una vez en funcionamiento, la API estará disponible en http://localhost:3500 (o el puerto configurado al ejecutar el contenedor). A continuación, se encuentran ejemplos de las rutas:

- POST [http://localhost:3500/send-notification]
- Body request:

```
{
  "patientId": "1"
}
```

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
