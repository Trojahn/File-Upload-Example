# Etapa 1 - Build do Vite
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2 - Servindo com nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]