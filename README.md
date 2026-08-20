# Site Institucional da Igreja

Projeto full-stack: **backend em Java (Spring Boot)** + **frontend em React.js, HTML e CSS**.

## Estrutura

```
igreja-site/
├── backend/     -> API REST em Java (Spring Boot + H2)
└── frontend/    -> Site em React
```

## Páginas do site

- **Início** — resumo institucional, próximo evento e últimas pregações
- **Sobre a igreja** — missão, visão, valores e história
- **Serviços** — cultos e ministérios oferecidos
- **Eventos** — com abas "Próximos eventos" e "Eventos que a igreja já realizou"
- **Pregações** — mensagens pregadas, filtráveis por tema
- **Pregadores** — perfil de cada pregador/pastor
- **Contato** — formulário de contato integrado à API

> Todos os textos, imagens, vídeos e o logotipo estão como **placeholders**
> (marcados com `[a ser fornecido]`) prontos para serem substituídos pelo
> conteúdo real quando você o tiver.

## Como rodar o backend (Java 17+ e Maven necessários)

```bash
cd backend
mvn spring-boot:run
```

A API sobe em `http://localhost:8080/api`. Na primeira execução, o banco H2
(`./backend/data/igreja.mv.db`) é criado e populado com alguns dados de
exemplo (ver `DataSeeder.java`). Console do H2 disponível em
`http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:file:./data/igreja`).

### Endpoints principais

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/eventos?realizado=false` | Próximos eventos |
| GET | `/api/eventos?realizado=true` | Eventos já realizados |
| GET | `/api/pregacoes` | Lista de pregações |
| GET | `/api/pregadores` | Lista de pregadores |
| GET | `/api/servicos` | Lista de serviços/ministérios |
| POST | `/api/contato` | Envio do formulário de contato |

## Como rodar o frontend (Node.js 18+ necessário)

```bash
cd frontend
npm install
cp .env.example .env   # ajuste a URL da API se necessário
npm start
```

O site abre em `http://localhost:3000`.

## Identidade visual

- **Cores:** azul-noite (`#1b2a44` / `#101a2c`), dourado-vela (`#c9a24b`) como
  destaque, terracota (`#9c4a36`) para ações importantes, e um fundo em tom
  linho (`#faf6ec`).
- **Tipografia:** `Fraunces` (serifada, para títulos) + `Source Sans 3`
  (para texto corrido).
- **Elemento assinatura:** um motivo de **arco** (janela de capela), usado em
  divisores de seção, molduras de imagem e no sublinhado do menu.
- **Animações:** revelação suave ao rolar a página, leve elevação dos
  cartões ao passar o mouse, menu com transição de arco. Toda a animação
  respeita `prefers-reduced-motion`.
- **Responsividade:** menu com hambúrguer em telas pequenas, grades que
  colapsam de 3/4 colunas até 1 coluna.

## Próximos passos sugeridos

1. Substituir os textos, imagens, vídeos e logotipo marcados como
   "a ser fornecido".
2. Cadastrar eventos, pregações, pregadores e serviços reais (via
   `POST` na API, ou criando um pequeno painel administrativo depois).
3. Trocar o banco H2 por PostgreSQL/MySQL em produção (basta alterar
   `application.properties` e a dependência do driver no `pom.xml`).
4. Publicar o frontend (Vercel/Netlify) e o backend (Render/Railway/EC2),
   ajustando `REACT_APP_API_URL` e o CORS (`app.frontend-url`).
