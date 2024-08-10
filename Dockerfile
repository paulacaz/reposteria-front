# Usar una imagen base de Node.js para construir la aplicación
FROM node:18.13 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install --force

# Copiar el código fuente de la aplicación
COPY . .

# Construir la aplicación Angular para producción
RUN npm run build -- --configuration production

# Usar una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos de la aplicación construida desde la etapa anterior
COPY --from=build /app/dist/reposteria-app/browser /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto que usa Nginx
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
