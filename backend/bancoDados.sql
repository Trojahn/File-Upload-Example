CREATE DATABASE IF NOT EXISTS exemplo_upload_arquivo;

-- Cria usuário específico para a aplicação
CREATE USER IF NOT EXISTS 'fileupload'@'localhost' IDENTIFIED BY 'fileuploadsenha';
CREATE USER IF NOT EXISTS 'fileupload'@'%' IDENTIFIED BY 'fileuploadsenha';

GRANT ALL PRIVILEGES ON exemplo_upload_arquivo.* TO 'fileupload'@'localhost';
GRANT ALL PRIVILEGES ON exemplo_upload_arquivo.* TO 'fileupload'@'%';
FLUSH PRIVILEGES;

USE exemplo_upload_arquivo;

CREATE TABLE IF NOT EXISTS perfil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(100) UNIQUE NOT NULL,
    foto VARCHAR(100)
);