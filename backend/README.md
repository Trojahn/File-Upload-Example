# Back-End

> Back-end utilizado para demonstrar as capacidades de upload e armazenamento no sistema de arquivos imagens enviadas por um cliente. Os dados são armazenados também em um banco de dados para simular a criação de perfis de usuários.

### Avisos

Este código é puramente didático e deve ser utilizado apenas como modelo inicial de desenvolvimento.

## 💻 Pré-requisitos

Antes de começar, verifique que sua máquina possua:

- `Node`
- `npm`
- Uma instalação do `mysql`

## 🚀 Instalando

Primeiro, certifique-se de criar o banco de dados `mysql` usando o arquivo **bancoDados.sql** presente nesta pasta.

Segundo, depois de o banco de dados criado, ajuste a função *conecta()* presente no arquivo **banco.js** para refletir os dados da sua instalação do mysql. Atenção especial a porta de conexão (*port*), nome de usuário (*username*) e senha (*password*). 

Terceiro iniciar o back-end, digite os seguintes comandos no terminal/prompt de comando:

```
cd backend/
npm install 
node index.js
```

Quarto, para avaliar se o back-end está operacional, acesse a rota **/perfil** e verifique se houve algum problema no terminal/prompt de comando do backend. Caso negativo, o back-end está funcionando corretamente.

## ☕ Usando

Acesse a url do serviço em execução. Em geral, o endereço `http://localhost:8000/` é geralmente utilizado.

As rotas disponíveis e seus propósitos são:

- GET `/perfil` - Retorna a lista de perfis cadastrados no sistema.
- GET `/perfil/id/foto` - Retorna a imagem associada ao perfil de determinado **id**.
- GET `/foto/xxxxx` - Retorna a imagem cujo nome complete é **xxxxx**. Este é o valor retornado para a *foto* na rota `/perfil`.
- POST `/perfil` - Insere um novo perfil no sistema. Deve ser enviado no corpo da requisição os parâmetros **login** e **foto**, ambos no formato *multipart/form-data*.
- DELETE `/perfil/id` - Remove o perfil do sistema, removendo também a foto associada ao perfil.

## DockerFile

Para fins didáticos, sem usar o docker-composer, foram criados dois DockerFiles para praticar. Nessa situação, execute os seguintes passos na ordem dada:

```
docker network create fileupload
docker build -f .\Dockerfile.database -t imgbanco .
docker run -d --name banco --network fileupload imgbanco
docker run -d --name banco --network fileupload -p 3306:3306 imgbanco

docker build -f .\Dockerfile.backend imgbackend .
docker run -d --name backend --network fileupload -p 8000:8000 imgbackend
```

Depois disso, basta acessar com o navegador a página `http://localhost:8000/perfil`