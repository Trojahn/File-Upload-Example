# Front-End

> Front-end utilizado para demonstrar as capacidades de upload de imagens para um back-end Node.

### Avisos

Este código é puramente didático e deve ser utilizado apenas como modelo inicial de desenvolvimento.

## 💻 Pré-requisitos

Antes de começar, verifique que sua máquina possua:

- `Node`
- `npm`

## 🚀 Instalando

Para iniciar o front-end, digite os seguintes comandos no terminal/prompt de comando:

```
cd frontend/
npm install 
npm run dev
```

## ☕ Usando

Acesse a url do serviço em execução. Em geral, o endereço `http://localhost:5173/` é geralmente utilizado. Caso acesse via Docker, use o endereço `http://localhost:3000`.

## Docker

Para fins didáticos, sem usar o docker-composer, foi criado um DockerFile para praticar. Após a execução dos comandos Docker do backend (e checar que estão operacionais!), siga os seguintes passos:

```
docker build -t imgfrontend .
docker run -d --name frontend --network fileupload -p 3000:3000 imgfrontend
```

Depois disso, basta acessar com o navegador a página `http://localhost:3000`