# Projeto Web - React + Firebase

Aplicacao desenvolvida em React com tres paginas:

- Cadastro
- Login
- Principal

O projeto utiliza React Router DOM para navegacao entre paginas, Firebase Authentication para cadastro/login com e-mail e senha, e Firestore para armazenar os dados do usuario.

## Link publicado

https://projetoweb-15cde.web.app

## Estrutura principal

```txt
src/
├── paginas/
│   ├── Cadastro/
│   │   └── index.js
│   ├── Login/
│   │   └── index.js
│   └── Principal/
│       └── index.js
├── firebase.js
├── routes.js
├── App.js
└── App.css
```

## Como executar localmente

Instale as dependencias:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto seguindo o modelo do arquivo `.env.example`.

Inicie o projeto:

```bash
npm start
```

O projeto sera aberto em:

```txt
http://localhost:3000
```

## Build

Para gerar a versao de producao:

```bash
npm run build
```

## Deploy

Para publicar no Firebase Hosting:

```bash
firebase login
firebase use --add projetoweb-15cde
npm run build
firebase deploy --only hosting
```

## Observacao

O arquivo `.env` nao foi incluido na entrega por conter configuracoes locais do Firebase. Use o arquivo `.env.example` como referencia.
