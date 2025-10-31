# Hid3r — Tome dos Contatos (Refactor)

Este rework moderniza o projeto original usando Vite + Tailwind + ES modules. O objetivo é:

- Usar Tailwind para estilização.
- Modularizar o JavaScript (ES modules).
- Usar bibliotecas modernas para animações (GSAP).
- Manter um backup local do config sensível para desenvolvimento.
- Preparar para deploy no Vercel usando variáveis de ambiente.

## Como rodar localmente

Pré-requisitos: Node.js 18+ (ou LTS moderna)

1. Instale dependências:

```powershell
npm install
```

2. Rodar em dev:

```powershell
npm run dev
# abre http://localhost:5173 por padrão (ou o porto mostrado pelo Vite)
```

3. Build para produção:

```powershell
npm run build
npm run preview
```

## Variáveis de ambiente (Vercel)

Configure os seguintes valores no dashboard do Vercel (prefixados com VITE_ para serem injetados pelo Vite):

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

Se não quiser configurar env vars localmente, existe `local_config_backup.json` (gitignored) que contém o config original — ele será usado somente em desenvolvimento.

## Segurança e notas

- O backup local contém chaves sensíveis e NÃO deve ser comitado (já está em `.gitignore`).
- Em produção configure as variáveis de ambiente diretamente no provedor (Vercel).
- Recomendamos revisar as regras do Firestore para garantir acesso mínimo.

## Estrutura do projeto

- `index.html` — entrada
- `src/main.js` — bootstrap
- `src/ui/*` — componentes (Comic, Tests, Contacts)
- `src/services/firebase.js` — wrapper de Firestore e backup local
- `local_config_backup.json` — backup local (gitignored)

## Melhorias possíveis

- Mock de Firestore para testes offline
- Unit tests para funções utilitárias
- CI com lint + build on push
# Hid3r