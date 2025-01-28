# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Expone el puerto del microservicio
EXPOSE 4001

# Define el comando para ejecutar el servidor
CMD ["npm", "start"]
