# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias y construirlas primero para aprovechar el caché de Docker
COPY package*.json ./
RUN npm ci

# Copiar el resto del código y compilar la aplicación
COPY . .
RUN npm run build

# Etapa 2: Servidor
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos generados por Vite en la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 (el que Dokploy mapeará automáticamente)
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
