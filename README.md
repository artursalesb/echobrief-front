# EchoBrief AI - Frontend

Interface web do EchoBrief AI, uma aplicação que transforma áudios em tarefas organizadas utilizando Inteligência Artificial.

## Demonstração

Aplicação Online:

https://echobrief-ai.vercel.app

Backend API:

https://echobriefai.onrender.com

---

## Sobre o Projeto

O frontend foi desenvolvido para oferecer uma experiência simples e intuitiva para o gerenciamento de tarefas geradas automaticamente a partir de áudios.

O usuário pode:

* Criar conta e autenticar-se
* Enviar ou gravar áudios
* Visualizar a transcrição processada pela IA
* Gerenciar tarefas geradas automaticamente
* Consultar histórico de interações
* Acompanhar tarefas por categoria e status

---

## Tecnologias Utilizadas

### Frontend

* Next.js 15
* React
* TypeScript
* JavaScript
* CSS Modules
* Axios

### Integrações

* Spring Boot API
* JWT Authentication
* Inteligência Artificial via Spring AI
* PostgreSQL

### Deploy

* Vercel

---

## Funcionalidades

### Autenticação

* Cadastro de usuários
* Login com JWT
* Persistência de sessão

### Processamento de Áudio

* Gravação de áudio pelo navegador
* Upload de arquivos
* Envio para processamento

### Dashboard

* Visualização de tarefas
* Controle de status
* Organização por categorias

### Histórico

* Consulta de interações anteriores
* Acompanhamento de tarefas criadas

---

## Estrutura do Projeto

```text
app/
├── audio/
├── components/
├── dashboard/
├── history/
├── types/
├── layout.tsx
└── page.tsx

lib/
└── api.js
```

---

## Executando Localmente

### Instalar dependências

```bash
npm install
```

### Configurar variáveis de ambiente

Crie um arquivo `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Executar

```bash
npm run dev
```

Aplicação disponível em:

```text
http://localhost:3000
```

---

## Arquitetura

```text
Usuário
   ↓
Next.js Frontend
   ↓
Spring Boot API
   ↓
Spring AI
   ↓
PostgreSQL
```

---

## Capturas de Tela

Adicione aqui imagens das telas:

* Login
* Dashboard
* Processamento de áudio
* Histórico de tarefas

---

## Autor

Artur Sales

Estudante de Ciência da Computação com foco em Backend, Cloud Computing e DevOps.

LinkedIn:
linkedin.com/in/artursales10
