CREATE DATABASE IF NOT EXISTS exemplo_upload_arquivo;
USE exemplo_upload_arquivo;

CREATE TABLE IF NOT EXISTS perfil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(100) UNIQUE NOT NULL,
    foto VARCHAR(100)
);