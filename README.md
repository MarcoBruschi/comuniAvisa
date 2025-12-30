# 📢 ComuniAvisa

O **ComuniAvisa** é uma plataforma web comunitária desenvolvida para facilitar a **comunicação local**, permitindo que usuários publiquem **alertas**, **serviços**, **monitorias**, **workshops** e **conteúdos educativos**.

O projeto utiliza **HTML, CSS, JavaScript** no front-end e **PHP + MySQL** no back-end, feito para **projeto final do segundo período da matéria Desenvolvimento Web**.

Integrantes do projeto:
<br>Marco Antônio: **https://github.com/MarcoBruschi**
<br>Pedro Henrique: **https://github.com/Pedruohnr**
<br>Vinícius Niemies: **https://github.com/vini-niemies**
<br>Arthur Guidolin: **https://github.com/arthurguidolin**
<br>Mariana Mazur: **https://github.com/mariimzld**

---

## 🚀 Funcionalidades

- 👤 Cadastro e login de usuários
- 🔐 Controle de sessão (login e logoff)
- 🧾 Criação, listagem e gerenciamento de:
  - Alertas
  - Serviços
  - Monitorias
  - Workshops
  - Conteúdos educativos
- 🖼 Upload de imagens
- 👤 Perfil do usuário
- 📡 Comunicação via API PHP usando `fetch`
- 🎨 Interface responsiva com Bootstrap

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap

### Back-end
- PHP 7.4+
- MySQL / MariaDB

---

## 📁 Estrutura do Projeto

```
comuniAvisa/
├── index.html
├── css/
├── js/
├── php/
└── assets/
```

---

## ⚙️ Requisitos

- PHP 7.4 ou superior
- MySQL ou MariaDB
- Servidor local (XAMPP, WAMP, Laragon, etc.)
- Navegador moderno

---

## 🔧 Instalação

### 1️⃣ Clonar ou copiar o projeto
Coloque a pasta do projeto dentro do diretório do servidor local:

```
htdocs/comuniAvisa/
```

---

### 2️⃣ Criar o banco de dados

Execute o script SQL abaixo no **phpMyAdmin** ou via terminal MySQL:

```sql
CREATE DATABASE ComuniAvisa;
USE ComuniAvisa;

CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    data_cadastro DATETIME NOT NULL,
    endereco VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE alerta (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    gravidade VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    data_criacao DATETIME NOT NULL,
    endereco_imagem VARCHAR(2083),
    nome_usuario VARCHAR(100) NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE monitoria (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    endereco_imagem VARCHAR(2083),
    data_criacao DATETIME NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE workshop (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    conteudo VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    data_criacao DATETIME NOT NULL,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    tema VARCHAR(50) NOT NULL,
    publico VARCHAR(50) NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE conteudo_educativo (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    conteudo VARCHAR(255) NOT NULL,
    link VARCHAR(2083),
    tema VARCHAR(50) NOT NULL,
    publico VARCHAR(50) NOT NULL,
    data_criacao DATETIME NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE servico (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    data_criacao DATETIME NOT NULL,
    endereco_imagem VARCHAR(2083),
    tempo_servico VARCHAR(100) NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id)
);
```

---

### 3️⃣ Configurar conexão com o banco

No arquivo `php/conexao.php`, ajuste conforme seu ambiente:

```php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "ComuniAvisa";
```

---

### 4️⃣ Executar o projeto

Abra no navegador:

```
http://localhost/comuniAvisa/
```

---

## 🔐 Observações de Segurança

- Sessões são controladas via PHP
- Projeto voltado para fins educacionais

---

## 📌 Observações Finais

- Projeto acadêmico
- Código em PHP procedural
- Fácil adaptação para MVC ou frameworks modernos

---

