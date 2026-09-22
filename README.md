# abraãolira.work

> **Novo design:** leia [ATUALIZACAO-DESIGN.md](./ATUALIZACAO-DESIGN.md) para abrir a prévia, aplicar esta versão no repositório existente e conhecer as verificações realizadas.

Site pessoal de Abraão Lira — dev independente focado em profissionais liberais.

**Stack:** Astro 5 + React + TypeScript · **Hospedagem:** Vercel · **Domínio:** GoDaddy

---

## 1. Rodar localmente

```bash
# instala dependências
npm install

# copia variáveis de ambiente
cp .env.example .env
# edite .env com seus dados reais

# sobe servidor de dev em http://localhost:4321
npm run dev
```

> O arquivo `.env` real não vai para o GitHub. Ele fica só no seu computador e nas variáveis de ambiente da Vercel.

## 2. Personalizar conteúdo

Toda informação editável fica em **`src/data/site.ts`**. Mexa lá pra trocar:

- Seu WhatsApp (campo `whatsapp` — formato `5547999999999`, sem +, espaço ou hífen)
- Email, GitHub, LinkedIn
- Serviços, preços e descrições
- Projetos do portfólio
- Princípios e FAQ

A foto entra em `public/portrait.jpg` (proporção 4:5 recomendada). Enquanto não tiver, o site mostra o monograma "AL" como placeholder.

## 3. Configurar Sheets + WhatsApp

### 3.1 Planilha de leads (Google Sheets)

1. Crie uma planilha nova no Google Sheets
2. `Extensões` → `Apps Script`
3. Cole o conteúdo de `sheets-webhook.gs` no editor
4. Salve com Ctrl+S
5. `Implantar` → `Nova implantação` → tipo **Web app**
6. `Executar como`: Eu · `Quem tem acesso`: Qualquer pessoa
7. Implantar e copiar a URL gerada
8. Cole em `.env` como `SHEETS_WEBHOOK_URL`

### 3.2 Notificação no WhatsApp (CallMeBot — grátis)

1. Salve `+34 644 51 95 23` nos seus contatos como "CallMeBot"
2. Envie a mensagem `I allow callmebot to send me messages` pra esse número pelo WhatsApp
3. Aguarde a resposta com sua API key (chega em alguns minutos)
4. Crie seu arquivo local a partir do exemplo:

```bash
cp .env.example .env
```

5. No `.env`, preencha os dados reais:

```env
CALLMEBOT_PHONE=5515981194064
CALLMEBOT_API_KEY=SUA_CHAVE_REAL_AQUI
```

> Nunca suba o arquivo `.env` real para o GitHub. Ele contém sua API key.

> **Alternativa profissional:** se quiser usar a WhatsApp Business API direto (a mesma que você usa no trabalho), me chama que adapto o endpoint pra Meta Graph API.

## 4. Deploy na Vercel

### 4.1 Subir pro GitHub

```bash
git init
git add .
git commit -m "feat: site inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/abraaolira-work.git
git push -u origin main
```

### 4.2 Conectar à Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. `Import` no repositório
3. Framework: **Astro** (auto-detectado)
4. Em `Environment Variables`, adicione as variáveis do `.env`:

   | Nome | Valor |
   |------|-------|
   | `SHEETS_WEBHOOK_URL` | URL do Apps Script, se for usar Google Sheets |
   | `CALLMEBOT_PHONE` | Seu número com DDI, sem `+`, espaços ou hífens |
   | `CALLMEBOT_API_KEY` | Sua chave real do CallMeBot |

5. Salve as variáveis para o ambiente `Production`
6. Faça um novo deploy

Em 1-2 minutos o site tá no ar em `seu-projeto.vercel.app`.

## 5. Apontar o domínio da GoDaddy

> ⚠️ **Atenção ao domínio com til (`abraãolira.work`):** internamente o DNS usa a forma "Punycode" `xn--abralira-i7a4f.work`. A GoDaddy aceita o registro com til mas armazena no formato Punycode. Por segurança, **registre também `abraaolira.work` (sem til)** como redirect — é mais barato e evita usuário se perder.

### 5.1 Na Vercel

1. Dashboard do projeto → `Settings` → `Domains`
2. Adicione `abraãolira.work` (com til) **e** `www.abraãolira.work`
3. A Vercel vai mostrar os valores DNS necessários — anota:
   - Tipo `A` apontando pra `76.76.21.21` (raiz)
   - Tipo `CNAME` apontando pra `cname.vercel-dns.com` (www)

### 5.2 Na GoDaddy

1. Login → `Meus produtos` → ao lado do domínio, `DNS`
2. Procure os registros existentes e **remova** os tipo `A` apontando pra "Parked" e o `CNAME` `www`
3. Adicione:

   | Tipo  | Host | Aponta para                | TTL  |
   |-------|------|----------------------------|------|
   | A     | @    | 76.76.21.21                | 600  |
   | CNAME | www  | cname.vercel-dns.com       | 600  |

4. Salvar. Propagação leva de 5min a 24h (geralmente 15min).

### 5.3 Testando

Após propagação:
```bash
dig abraãolira.work +short
# Deve retornar: 76.76.21.21
```

Ou use [dnschecker.org](https://dnschecker.org).

## 6. Estrutura do projeto

```
abraaolira-work/
├── src/
│   ├── components/      → Hero, Works, Services, Contact, Footer, etc.
│   ├── data/site.ts     → ⭐ TUDO QUE VOCÊ EDITA FICA AQUI
│   ├── layouts/Base.astro
│   ├── pages/
│   │   ├── index.astro  → home
│   │   └── api/lead.ts  → endpoint Sheets+WhatsApp
│   └── styles/global.css
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── portrait.jpg     → ❗ adicione sua foto aqui
├── sheets-webhook.gs    → cole no Apps Script
├── astro.config.mjs
├── vercel.json
├── .env.example         → modelo seguro, pode ir para o GitHub
└── .gitignore           → impede o envio do `.env` real
```

## 7. Próximos passos sugeridos

- [ ] Adicionar foto pessoal em `public/portrait.jpg`
- [ ] Criar páginas individuais de case (`/projetos/[slug]`) — me chama que faço
- [ ] Plugar Google Search Console pra rastrear indexação
- [ ] Trocar números de WhatsApp/email pelos reais em `src/data/site.ts`
- [ ] Configurar redirect de `abraaolira.work` → `abraãolira.work` (ou vice-versa) na Vercel

---

Feito com Astro · Hospedado na Vercel · Camboriú/SC 🌊
