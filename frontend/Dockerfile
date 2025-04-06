FROM node:20

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando para iniciar o Vite
CMD ["npm", "run", "dev", "--", "--host"]
