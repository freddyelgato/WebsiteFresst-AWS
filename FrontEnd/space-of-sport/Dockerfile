FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Asegurarse de que Next.js escuche en todas las interfaces de red
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
