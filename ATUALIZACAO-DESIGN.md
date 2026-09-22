# Atualização visual — Abraão Lira

Implementação do conceito aprovado, com creme #F4F1EA, preto #0F0F0E e vermelho #FF3D2E. Tipografia Inter, navegação translúcida, destaque para o portfólio, cartões arredondados e serviços sobre fundo preto. A versão mobile reorganiza o conteúdo em uma coluna, com menu recolhível e formulário empilhado.

## Abrir a prévia

Use Node.js 22 (compatível com o runtime escolhido pelo adaptador da Vercel).

```bash
npm ci
npm run dev
```

Abra http://localhost:4321. Para compilar:

```bash
npm run build
```

## Aplicar no repositório existente

1. Crie uma branch para revisar a atualização antes de incorporá-la à branch de produção.
2. Copie o conteúdo desta pasta sobre os arquivos do projeto existente. Preserve seu `.git`, seu `.env` local e as configurações do projeto na Vercel.
3. Inclua os novos arquivos `src/styles/home.css`, `src/styles/contact-form.css`, `src/components/FeatureIcon.astro`, `src/env.d.ts` e `package-lock.json`.
4. Rode a prévia e confira desktop e mobile. Teste o menu, o case, as perguntas e o formulário.
5. Envie a branch para o GitHub e revise a prévia da Vercel, caso o repositório já esteja conectado. Um merge na branch configurada para produção pode publicar o site automaticamente.

Não é necessário recriar o projeto na Vercel ou alterar o DNS.

## Conteúdo e integrações

- Serviços, preços, projetos, contatos e respostas continuam em `src/data/site.ts`.
- Textos completos da apresentação e da seção Sobre foram preservados.
- A indicação original de disponibilidade continua como “Aceitando 5 projetos · ago/2026”, agora no campo `site.availability`. Atualize esse campo quando desejar.
- O monograma AL permanece, pois `site.portrait` está vazio. A imagem enviada no repositório não foi ativada sem uma escolha explícita.
- A prévia do BelaPsicologia é o componente ilustrativo existente no repositório, com os dados originais; não é uma captura ao vivo.
- A API `/api/lead`, o script do Sheets e os nomes das variáveis de ambiente foram preservados. Nenhuma credencial foi incluída.
- LinkedIn só aparece quando existe uma URL configurada, evitando um link vazio.
- A navegação mobile funciona com `<details>` mesmo sem JavaScript. Com JavaScript, fecha ao selecionar um link, clicar fora ou pressionar Escape.
- O formulário usa validação nativa de campos obrigatórios/email, além da validação existente na API. Os estilos de sucesso e erro agora permanecem disponíveis depois do envio.
- A animação que deixava conteúdo invisível até o scroll foi removida. O conteúdo continua disponível sem JavaScript; efeitos respeitam redução de movimento.

## Verificação realizada

- `npm run build`: aprovado, incluindo o bundle para a Vercel.
- `npx tsc --noEmit`: aprovado após adicionar os tipos do ambiente Astro.
- Página inicial e `/projetos/bela-psicologia`: resposta HTTP 200.
- Um h1 por página, IDs sem duplicação e destinos dos links internos conferidos.
- Preços e contatos conferidos no HTML renderizado.
- API rejeita dados obrigatórios ausentes e email inválido com HTTP 400.

## Limites da verificação

O navegador remoto disponível bloqueou o endereço do servidor local. Portanto, não foi realizada inspeção visual por screenshot nem teste interativo de menu/teclado em navegador. Os layouts mobile foram implementados com breakpoints de 1000, 760, 640 e 480px, mas precisam de revisão visual na prévia local ou da Vercel.

Nenhum formulário válido foi enviado aos serviços externos. O recebimento em Sheets/WhatsApp depende das variáveis de ambiente já configuradas na Vercel e deve ser testado na prévia. A API original permite resposta de sucesso mesmo quando não há integrações configuradas; ela foi mantida nesta atualização visual, por isso uma mensagem de sucesso local não comprova entrega externa.

O site público não foi publicado ou alterado nesta tarefa.
