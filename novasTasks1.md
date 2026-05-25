# Guilda do Arqueiro Arcano - Pacote de Expansão

Bem-vindo ao nível veterano! Sua guilda já recruta aventureiros, mas agora precisamos transformá-la em uma verdadeira fortaleza.

Este documento contém 4 novas missões focadas no que o mercado de fato exige de um desenvolvedor NestJS Pleno/Sênior. Recomendamos criar uma branch nova no Git (ex: `feature/auth`) para cada expansão.

---

## 🗡️ Expansão 1: A Ordem dos Mestres (Autenticação JWT)

**Objetivo:** Proteger a rota de recrutamento. Apenas usuários autenticados (Mestres da Guilda) podem criar novos aventureiros.

### Tarefas

1. **O Registro dos Mestres:** Crie o model `User` no `schema.prisma` com `id` (UUID), `email` (@unique), `password` e `name`. Rode a migration (`npx prisma migrate dev --name add_user`).
2. **O Arsenal Criptográfico:** Instale os pacotes: `npm i @nestjs/jwt bcrypt` e `npm i -D @types/bcrypt`.
3. **O Módulo de Autenticação:** Crie o `AuthModule`, `AuthController` e `AuthService`.
   - Crie a rota `POST /auth/register` para criar o usuário. Use `bcrypt.hash()` para não salvar a senha em texto puro.
   - Crie a rota `POST /auth/login`. Use `bcrypt.compare()` para verificar a senha e `JwtService` para retornar o token (`access_token`).
4. **O Guarda do Portão:** Crie um `AuthGuard` implementando `CanActivate` que valide o token JWT enviado no cabeçalho `Authorization: Bearer <token>`.
5. **A Defesa da Guilda:** Proteja a rota `POST /adventurers` no `AdventurerController` com o `@UseGuards(AuthGuard)`. Teste a rota com e sem o token!

---

## 📜 Expansão 2: O Quadro de Contratos (Relacionamentos Prisma)

**Objetivo:** Os aventureiros precisam trabalhar! Crie missões e associe-as aos membros da guilda.

### Tarefas

1. **O Contrato:** No `schema.prisma`, crie o model `Quest` com `id`, `title`, `description`, `reward` (Float), `status` (ex: "PENDING", "COMPLETED") e relacione 1:N com o model `Adventurer`. Rode a migration.
2. **Quadro de Missões:** Crie o módulo/controller/service para `Quest`.
   - Crie a rota `POST /quests` para criar missões.
   - Crie a rota `GET /adventurers/:id/quests` para listar as missões de um herói específico usando o `include: { quests: true }` do Prisma.
3. **O Pagamento:** Crie uma rota `PATCH /quests/:id/complete`. Quando chamada, o status da quest vai para "COMPLETED" e a `reward` deve ser somada ao `gold` do Aventureiro que a completou em uma transação (`$transaction`).

---@

## 🗃️ Expansão 3: O Arquivo Morto (Paginação e Interceptors)

**Objetivo:** Otimizar a listagem e padronizar as respostas da API para o Front-end.

### Tarefas

1. **A Divisão dos Tomos:** Na rota `GET /adventurers`, receba parâmetros na URL (Query Params) de `page` e `limit` (ex: `?page=1&limit=10`).
2. **Otimização de Busca:** No `AdventurerService`, modifique o `findMany` para utilizar o `skip` e `take` baseados nos query params. Retorne também o total de páginas (usando `count`).
3. **A Magia do Interceptor:** Chega de ficar digitando `return { data: res }` em toda função.
   - Crie um arquivo `transform.interceptor.ts`.
   - Implemente um interceptor global que embrulha automaticamente o retorno de qualquer rota dentro da propriedade `data`.
   - Limpe o `AdventurerService` para retornar apenas o array ou objeto direto.

---

## 🛡️ Expansão 4: As Muralhas Mágicas (Cibersegurança Básica)

**Objetivo:** Proteger a infraestrutura contra ataques comuns, como DDoS e bruteforce no login.

### Tarefas

1. **O Elmo de Proteção:** Instale o pacote `helmet` (`npm i helmet`). Aplique-o como middleware global no seu `main.ts` logo após instanciar a aplicação. Isso esconderá informações sensíveis do servidor nos headers.
2. **O Escudo Refletor:** Instale o módulo oficial de rate limiting: `npm i @nestjs/throttler`.
3. **Configuração de Limite:** Configure o `ThrottlerModule` no seu `AppModule`.
   - Defina um limite global (ex: máximo de 10 requisições por minuto por IP).
   - Aplique o `ThrottlerGuard` de forma global para barrar IPs que fizerem spam de requisições, protegendo principalmente suas rotas de login contra força-bruta.

---

_Boa sorte na expansão, Mestre de Guilda!_
