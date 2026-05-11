# next-base 🚀

Boilerplate Next.js pronto para uso, com autenticação, componentes UI e estrutura organizada para acelerar o início de novos projetos.

---

## 🛠️ Tecnologias

| Tecnologia | Versão |
|---|---|
| Next.js | 15 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| shadcn/ui | latest |
| Lucide React | latest |

---

## ✨ O que já vem incluído

- ✅ Next.js 15 com App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ shadcn/ui — componentes acessíveis e reutilizáveis
- ✅ Autenticação com middleware e proteção de rotas via cookie
- ✅ Fontes otimizadas com `next/font`
- ✅ Toast notifications com Sonner
- ✅ Lucide React para ícones
- ✅ Separação de rotas públicas e privadas com Route Groups
- ✅ Estrutura escalável para projetos reais

---

## 📁 Estrutura do projeto

```txt
next-base/
├── public/                         # Arquivos estáticos
├── components/
│   └── ui/                         # Componentes shadcn/ui
├── hooks/
│   └── use-mobile.ts
├── lib/
│   └── utils.ts
├── src/
│   ├── middleware.ts               # Proteção de rotas
│   └── app/
│       ├── layout.tsx
│       ├── globals.css
│       ├── favicon.ico
│       │
│       ├── (public)/               # Rotas públicas
│       │   ├── login/
│       │   └── register/
│       │
│       ├── (private)/              # Rotas protegidas
│       │   ├── dashboard/
│       │   ├── profile/
│       │   └── user/
│       │       └── list/
│       │
│       ├── components/             # Componentes globais
│       │   ├── bread-crumb.tsx
│       │   ├── table-grid.tsx
│       │   ├── top-menu.tsx
│       │   ├── filter/
│       │   ├── left-menu/
│       │   └── modal-right-form/
│       │
│       └── services/               # Serviços e tipos
│           ├── api.ts
│           ├── login/
│           ├── users/
│           ├── table/
│           ├── filter/
│           └── form/
```

---

## 🚀 Como iniciar

### Pré-requisitos

- Node.js 18+
- npm

---

### 1. Clone o repositório

```bash
git clone https://github.com/guiarduino/next-base.git
cd next-base
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure as variáveis de ambiente

Crie um `.env.local` baseado no exemplo:

```bash
cp .env.example .env.local
```

Exemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
JWT_SECRET=sua-chave-secreta
```

---

### 4. Inicie o servidor

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

---

## 🔐 Autenticação

O projeto utiliza Route Groups para separar rotas públicas e privadas.

### Rotas públicas

Acessíveis sem autenticação:

- `/login`
- `/register`

### Rotas privadas

Protegidas pelo middleware:

- `/dashboard`
- `/profile`
- `/user/list`

### Funcionamento

O middleware verifica o cookie `authToken`:

- Sem token em rota privada → redireciona para `/login`
- Com token em rota pública → redireciona para `/dashboard`

---

## 🧩 Adicionando componentes shadcn/ui

```bash
npx shadcn@latest add <componente>
```

Exemplos:

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add table
```

---

## 📦 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia em modo desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run lint` | Executa o ESLint |

---