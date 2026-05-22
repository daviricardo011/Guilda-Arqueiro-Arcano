# Guilda do Arqueiro Arcano

Bem-vindo ao projeto! Você vai construir um sistema de gerenciamento de guilda inspirado em Tormenta20 e Baldur's Gate 3.

O sistema precisa:
- registrar novos membros
- listar a party
- aplicar regras de negócio estritas

O projeto está dividido em 5 missões. Faça cada uma e envie o código para revisão.

---

## Missão 1: O Calabouço (Infraestrutura)

**Objetivo:** Subir o PostgreSQL no Docker e configurar o Prisma com a nossa tabela de aventureiros.

### Tarefas

1. Crie o arquivo `docker-compose.yml` para rodar o PostgreSQL.
   - Pode usar a porta `5432`.
2. Inicie o Prisma no projeto.
3. Configure o `schema.prisma` com o model `Adventurer`.

### O model `Adventurer` deve ter:
- `id` (UUID)
- `name` (String)
- `characterClass` (String) — ex: Arqueiro Arcano, Bárbaro
- `level` (Int, default `1`)
- `gold` (Float, default `0.0`)
- `createdAt` (DateTime)

4. Rode a migração para criar a tabela no banco.

---

## Missão 2: O Quadro de Missões (NestJS Básico)

**Objetivo:** Criar a rota HTTP e usar o `PrismaService` para salvar o aventureiro no banco.

### Tarefas

1. Crie o `PrismaModule` e o `PrismaService` para conectar ao banco.
2. Crie o `AdventurerModule`, `AdventurerController` e `AdventurerService`.
3. Crie o DTO `CreateAdventurerDto` com validação:
   - `name` deve ser string e não pode estar vazio
   - `characterClass` deve ser string e não pode estar vazio
4. Crie a rota `POST /adventurers`:
   - Controller recebe o DTO
   - Service processa e usa o Prisma para inserir no PostgreSQL
5. Crie a rota `GET /adventurers`:
   - retorna todos os aventureiros cadastrados

---

## Missão 3: A Maldição (Tratamento de Erros)

**Objetivo:** Aprender a lançar exceções HTTP no NestJS.

### Tarefa

No `AdventurerService`, antes de salvar no Prisma, aplique esta regra de negócio:
- se `characterClass` for enviado como `Necromante`, o cadastro deve ser rejeitado.

Para rejeitar, importe `BadRequestException` de `@nestjs/common` e use:

```ts
throw new BadRequestException('Magia proibida na guilda!')
```

---

## Missão 4: O Teste de Resistência (Testes Unitários)

**Objetivo:** Garantir que a regra do Necromante funciona sem precisar rodar Docker ou Prisma de verdade.

### Tarefas

1. Crie o arquivo `adventurer.service.spec.ts`.
2. Faça o mock do `PrismaService` (injetando um banco falso no construtor do `AdventurerService`).
3. Escreva um teste que:
   - cadastra um `Arqueiro Arcano`
   - verifica se `prisma.adventurer.create` foi chamado
4. Escreva um teste que:
   - tenta cadastrar um `Necromante`
   - verifica se `BadRequestException` foi lançada

---

## Missão 5: A Taverna (Integração com o Front-end React)

**Objetivo:** Fazer o front-end conversar com o back-end e lidar com o CORS.

### Tarefas

1. Habilite o CORS no `main.ts` do NestJS.
   - por padrão, o NestJS bloqueia chamadas de outras portas, como `http://localhost:5173`
2. Crie uma tela simples em React que:
   - faz um `fetch` ou `axios.post` para a API
   - exibe a lista de aventureiros na tela
