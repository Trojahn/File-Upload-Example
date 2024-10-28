const express = require("express");
const bodyparser = require("body-parser");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const corsOptions = {
    origin: '*', // Permite todas as origens
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

const storage = multer.diskStorage({
    // Configura ONDE será salvo o arquivo depois de enviado.
    destination: "imagens/",
    filename: (req, file, cb) => {
        // Configura o como será nomeado o novo arquivo enviado.
        const nome = uuidv4(); // Gera um UUID
        const ext = path.extname(file.originalname); // Obtém a extensão do arquivo
        cb(null, `${nome}${ext}`); // Armazena com nome único + extensão
    }
})

// Configuração para filtar os arquivos de entrada...
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500 * 1024 //O arquivo será aceito se tiver até 500KB
    },
    fileFilter(req, file, cb) {
        //Aceita apenas arquivos de imagem (não importa se JPG, PNG, BMP, etc...)
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Apenas arquivos de imagem são aceitos"));
        }
        cb(null, true);
    },
});

const banco = require("./banco.js");
const app = express();

// Função auxiliar que remove um arquivo do sistema operacional.
async function deleteFile(caminho, pasta = "imagens/") {
    try {
        await fs.unlink(`${pasta}${caminho}`);
    } catch (err) {
        console.log(`Erro ao deletar o arquivo 'imagens/${caminho}'`);
    }
}

app.use(cors(corsOptions));
app.use("/", bodyparser.json());

/* Cadastrar um novo perfil no sistema. Requer "login" e "foto". */
app.post("/perfil", (req, res) => {
    upload.single("foto")(req, res, async (err) => {
        // O arquivo não foi enviado ou não segue alguma regra de tamanho/tipo.
        if (!req.file || err) {
            return res.status(400).send({ msg: "Imagem não foi enviada" })
        }
        // O login não foi enviado.
        if (!req.body.login) {
            // Remove o arquivo que acabou de ser enviado, se houver.
            deleteFile(req.file.filename);
            return res.status(400).send({ msg: "Login não foi enviado" })
        }

        // Não pode haver 2 usuários com mesmo "login". Verifica se já existe algum.
        const existe = await banco.existeLogin(req.body.login);
        if (existe) {
            // Remove o arquivo que acabou de ser enviado, se houver.
            deleteFile(req.file.filename);
            return res.status(400).send({ msg: "Já existe usuário perfil com tal login" });
        }

        const sucesso = await banco.cadastrarPerfil(req.body.login, req.file.filename);
        if (!sucesso) {
            // Remove o arquivo que acabou de ser enviado, se houver.
            deleteFile(req.file.filename);
            res.status(500).send({ msg: "Erro ao realizar o cadastro de perfil" });
        }
        return res.status(201).send({ msg: "Perfil cadastrado com sucesso!" });
    });
})

app.get("/perfil", async (req, res) => {
    const resposta = await banco.listarPerfil();
    res.status(200).json(resposta);
})

// Obtem o arquivo diretamente pelo ID...
app.get("/perfil/:id/foto", async (req, res) => {
    const existe = await banco.existeId(req.params.id);
    if (!existe) {
        res.status(404).send({ msg: "ID não encontrado" });
    }
    const resposta = await banco.obterFotoPorId(req.params.id);
    res.sendFile(path.join(__dirname, `imagens/${resposta}`));
})

// Obtem o arquivo direto pelo nome da foto...
app.get("/foto/:path", async (req, res) => {
    res.sendFile(path.join(__dirname, `imagens/${req.params.path}`));
})

// Remove o perfil, se houver...
app.delete("/perfil/:id", async (req, res) => {
    const existe = await banco.existeId(req.params.id);
    if (!existe) {
        res.status(404).send({ msg: "ID não encontrado" });
    }

    const foto = await banco.obterFotoPorId(req.params.id);

    const resposta = await banco.removerPerfilPorId(req.params.id);
    if (!resposta) {
        res.status(400).send({ msg: "Erro ao deletar o perfil" });
    }
    // Deu certo, o banco de dados foi modificado, hora de apagar a imagem do sistema.
    deleteFile(foto);
    res.status(200).send({ msg: `Perfil ${req.params.id} removido com sucesso.` });
})

app.listen(8000, () => {
    console.log("Executando na porta 8000");
});