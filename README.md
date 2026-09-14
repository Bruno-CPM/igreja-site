# Site Institucional da Igreja

Projeto full-stack: **backend em Node.js (Express + Sequelize + SQLite)** +
**frontend em React.js, HTML e CSS**.

## Estrutura

```
igreja-site/
├── backend/     -> API REST em Node.js (Express + Sequelize + SQLite)
└── frontend/    -> Site em React
```

## Páginas do site

- **Início** — resumo institucional, próximo evento e últimas pregações
- **Sobre a igreja** — missão, visão, valores e história
- **Serviços** — cultos e ministérios oferecidos
- **Eventos** — com abas "Próximos eventos" e "Eventos que a igreja já realizou"
- **Pregações** — mensagens pregadas, filtráveis por tema
- **Pregadores** — perfil de cada pregador/pastor
- **Contribuição** — Pix Copia e Cola com valor editável + cadastro de
  lembrete mensal de dízimo (por e-mail ou WhatsApp)
- **Contato** — formulário de contato integrado à API

> Textos, imagens e dados ainda não preenchidos aparecem marcados como
> `[a ser fornecido]`/`[a definir]`, prontos para serem substituídos pelo
> conteúdo real quando você o tiver.

## Como rodar o backend (Node.js 18+ necessário)

```bash
cd backend
npm install
cp .env.example .env   # ajuste PORT e FRONTEND_URL se necessário
npm start               # ou: npm run dev (reinicia sozinho ao salvar)
```

A API sobe em `http://localhost:8080/api`. Na primeira execução, o banco
SQLite (`./backend/data/igreja.sqlite`) é criado e populado com alguns dados
de exemplo (ver `backend/src/seeders/seed.js`).

### Endpoints principais

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/eventos?realizado=false` | Próximos eventos |
| GET | `/api/eventos?realizado=true` | Eventos já realizados |
| GET | `/api/pregacoes` | Lista de pregações |
| GET | `/api/pregadores` | Lista de pregadores |
| GET | `/api/servicos` | Lista de serviços/ministérios |
| POST | `/api/contato` | Envio do formulário de contato |
| POST | `/api/dizimo/lembrete` | Cadastro de lembrete mensal de dízimo |

## Como rodar o frontend (Node.js 18+ necessário)

```bash
cd frontend
npm install
cp .env.example .env   # ajuste a URL da API se necessário
npm start
```

O site abre em `http://localhost:3000`.

## Identidade visual

- **Cores:** preto/azul-royal, com dourado como destaque em botões e
  detalhes.
- **Elemento assinatura:** o logotipo "Vínculo da Paz" e imagens de vitral
  usadas como capa de cada seção do site.
- **Animações:** revelação suave ao rolar a página, leve elevação dos
  cartões ao passar o mouse. Toda a animação respeita `prefers-reduced-motion`.
- **Responsividade:** menu com hambúrguer em telas pequenas, grades que
  colapsam de 3/4 colunas até 1 coluna.

## Contribuição via Pix

A chave Pix, nome do beneficiário e cidade ficam configurados em
`frontend/src/pages/Contribuicao.jsx` (constante `PIX_CONFIG`). O código
"Copia e Cola" é gerado no navegador a partir desses dados (ver
`frontend/src/services/pix.js`), sem depender de nenhuma API externa.

## Deploy em produção

- **Frontend:** hospedado na Vercel, a partir da pasta `frontend/`. A URL
  da API é lida da variável de ambiente `REACT_APP_API_URL` (definida nas
  configurações do projeto na Vercel — é preciso um novo build a cada
  alteração, pois o React lê essa variável em tempo de build).
- **Backend:** precisa de um host com disco persistente, já que o banco é
  um arquivo SQLite (serverless como a própria Vercel não serve). Recomendado:
  [Railway](https://railway.app), com **Root Directory** apontando para
  `backend`, um **Volume** persistente montado em `/app/data`, e a variável
  `FRONTEND_URL` apontando para o domínio real do frontend (necessário para
  o CORS liberar as requisições).

## Próximos passos sugeridos

1. Substituir os textos e dados ainda marcados como "a ser fornecido"/"a
   definir" (endereço, telefone, horários de culto etc.).
2. Cadastrar eventos, pregações, pregadores e serviços reais (via `POST` na
   API, ou criando um pequeno painel administrativo depois).
3. Trocar o SQLite por PostgreSQL/MySQL em produção, se o volume de dados
   justificar (basta trocar o dialect/driver em
   `backend/src/config/database.js`).
4. Implementar o disparo automático dos lembretes mensais de dízimo
   (hoje o cadastro só fica salvo no banco — falta um job agendado que
   realmente envie o e-mail/WhatsApp).
