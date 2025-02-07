# Usar una imagen oficial de Node.js como base
FROM node:lts-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Construir el proyecto de Next.js para producción
RUN npm run build

# Exponer el puerto en el que se ejecutará el servidor (por defecto Next.js usa el puerto 3000)
EXPOSE 3000

# Comando para iniciar el servidor en modo producción
CMD ["npm", "start"]
