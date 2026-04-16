# Projeto Blog Pessoal - Frontend com React

<br />

<div align="center">     
     <img src="https://i.imgur.com/AzshGmS.png" title="source: imgur.com" width="50%"/>
</div> 
<br /> 

<div align="center">   
    <img src="https://img.shields.io/github/languages/top/jrs-neto/blogpessoal?style=flat-square" />
    <img src="https://img.shields.io/github/repo-size/jrs-neto/blogpessoal?style=flat-square" />   
     <img src="https://img.shields.io/github/languages/count/jrs-neto/blogpessoal?style=flat-square" />
    <img src="https://img.shields.io/github/last-commit/jrs-neto/blogpessoal?style=flat-square" />
    <img src="https://img.shields.io/github/issues/jrs-neto/blogpessoal?style=flat-square" />
  <img src="https://img.shields.io/github/issues-pr/jrs-neto/blogpessoal?style=flat-square" />
    <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square" /> 
</div>

<br />

## 1. Descrição

O **Blog Pessoal ** é uma aplicação web desenvolvida com **React** e **TypeScript**, com o objetivo de consumir e exibir dados de uma API REST. A aplicação permite a visualização, criação, edição e exclusão de postagens de blog, categorizadas por temas e vinculadas a usuários autenticados.

Funcionalidades:

1. Cadastro e login de usuários
2. Listagem e gerenciamento de postagens
3. Criação, edição e exclusão de temas
4. Associação entre postagens, temas e autores
5. Navegação entre páginas com React Router Dom
6. Consumo de API com Axios
7. Estilização com Tailwind CSS

<br />

## 2. Autenticação e Validação de Token JWT

### Fluxo de Autenticação

1. O usuário realiza o login com **e-mail** e **senha**.
2. A aplicação faz uma requisição para a API, que retorna um token **JWT**.
3. O token é armazenado na **Context API** para uso em futuras requisições autenticadas.
4. Nas rotas protegidas, o token é validado antes do acesso aos recursos.

### Controle de Autenticação

- Se o token expirar ou for inválido, o usuário será redirecionado para a página de login.

<br />

## 3. Tecnologias Utilizadas

| Tecnologia           | Finalidade                            |
| -------------------- | ------------------------------------- |
| **React**            | Biblioteca JavaScript para interfaces |
| **TypeScript**       | Superset do JavaScript com tipagem    |
| **Tailwind CSS**     | Estilização com classes utilitárias   |
| **Axios**            | Consumo de APIs REST                  |
| **React Router DOM** | Roteamento SPA                        |
| **Vite**             | Build tool rápido para projetos React |

<br />

## 4. Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) ou outro editor
- Backend de API (Consulte o repositório da API correspondente e certifique-se de estar rodando)

<br />

## 5. Como executar o projeto localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/jrs-neto/blogpessoal-react.git
```

2. **Acesse a pasta do projeto:**

```bash
cd blogpessoal
```

3. **Instale as dependências:**

```bash
npm install
# ou yarn install
```

4. **Execute o projeto em modo desenvolvimento:**

```bash
npm run dev
# ou yarn dev
```

5. **Acesse a aplicação em:**

```
http://localhost:5173
```

<br />

## 6. Consumo da API Backend

A aplicação foi projetada para se comunicar com um backend externo — no caso, uma API REST desenvolvida com **NestJS** e **Node.js**.

Os principais endpoints mapeados e consumidos pelo frontend em seus serviços incluem:

- **Autenticação e Usuários (`/usuarios`)**:
  - `POST /usuarios/logar`: Autenticação e geração do token JWT.
  - `POST /usuarios/cadastrar`: Cadastro de novos usuários.
  - `GET /usuarios/all`: Listagem e identificação de usuários.
  - `PUT /usuarios/atualizar`: Atualização de credenciais de um usuário logado.

- **Postagens (`/postagens`)**:
  - `GET /postagens` e `GET /postagens/:id`: Visualizar postagens.
  - `GET /postagens/titulo/:titulo`: Busca de postagens via sub-título.
  - `POST /postagens`: Criação de uma postagem do usuário logado.
  - `PUT /postagens` e `DELETE /postagens/:id`: Edição e exclusão de sua postagem.

- **Temas (`/temas`)**:
  - `GET /temas` e `GET /temas/:id`: Visualizar os temas existentes.
  - `GET /temas/descricao/:descricao`: Buscar os temas criados.
  - `POST /temas`: Para registrar um novo tema para categorizar postagens.
  - `PUT /temas` e `DELETE /temas/:id`: Edição e remoção de temas do blog.

> A URL base da API pode ser configurada (podendo ser `http://localhost:4000`, a porta padrão do NestJS, ou uma provedora da nuvem como o `Render`) diretamente em seus serviços de consumo HTTP (`Axios`) dentro da aplicação.

<br />

## 7. Estrutura de Diretórios

```
src/
│
├── assets/           → Imagens e ícones
├── components/       → Componentes reutilizáveis
├── contexts/         → Gerenciamento de estado global (ex: autenticação)
├── models/           → Interfaces e tipos do projeto
├── pages/            → Páginas da aplicação
├── services/         → Configuração do Axios e rotas da API
├── utils/            → Utilitários e funções de apoio (como toasts)
├── App.css           → Estilos adicionais e reset
├── App.tsx           → Componente raiz e configuração de rotas
├── main.tsx          → Entrada da aplicação
└── index.css         → Estilos globais com Tailwind
```

<br />

## 8. Implementações futuras

- Upload de imagem de perfil para o usuário
- Responsividade aprimorada
- Validações com React Hook Form
- Testes com Jest + React Testing Library

<br />

## 9. Contribuição

Contribuições são bem-vindas!

Se você encontrou algum problema ou deseja propor melhorias:

- Abra uma **issue**
- Envie um **pull request**
- Compartilhe com colegas desenvolvedores!

<br />

## 10. Contato

Desenvolvido por [**José Rodrigues - Full Stack Developer**](https://github.com/jrs-neto)
Dúvidas ou sugestões? Entre em contato pelo GitHub ou abra uma issue no repositório.
