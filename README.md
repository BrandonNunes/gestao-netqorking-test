# Gestão de Networking

Sistema de gestão para gerenciamento de participantes e aplicações em eventos de networking.

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd gestao-networking
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gestao_networking"
```

4. Configure o banco de dados com Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

## 🏃‍♂️ Execução do Projeto

### Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3000`

### Build de Produção

```bash
npm run build
npm start
```

## 🔧 Comandos Úteis do Prisma

### Gerar o cliente Prisma

```bash
npx prisma generate
```

### Criar e aplicar migrações

```bash
npx prisma migrate dev
```

### Criar uma nova migração com nome personalizado

```bash
npx prisma migrate dev --name nome_da_migracao
```

### Resetar o banco de dados

```bash
npx prisma migrate reset
```

### Visualizar o banco de dados (Prisma Studio)

```bash
npx prisma studio
```

### Sincronizar schema com banco existente

```bash
npx prisma db push
```

### Aplicar migrações em produção

```bash
npx prisma migrate deploy
```

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 16+ com App Router
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Estilização**: Tailwind CSS
- **Validação**: Zod
- **Formulários**: React Hook Form
- **Notificações**: Sonner

## 🚨 Tratamento de Erros Comuns

### Erro: "Prisma Client not found"

```bash
npx prisma generate
```

### Erro: "Database does not exist"

Certifique-se de criar o banco de dados PostgreSQL antes de rodar as migrações.

### Erro: "Migration failed"

```bash
npx prisma migrate reset
```
