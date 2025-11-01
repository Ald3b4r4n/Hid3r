# Hid3r — Tome dos Contatos

Uma aplicação web interativa que combina elementos de quadrinhos, testes de conhecimento e um sistema de contatos, desenvolvida com tecnologias modernas.

## 🚀 Tecnologias Utilizadas

### Runtime & Ferramentas
- **Node.js**: v22.17.0
- **npm**: v10.9.2

### Framework & Build
- **Vite**: ^4.4.9 (bundler e dev server)

### Dependências Principais
- **Firebase**: ^10.7.1 (backend e banco de dados)
- **GSAP**: ^3.12.0 (animações)

### Desenvolvimento & Estilização
- **Tailwind CSS**: ^3.4.14 (framework CSS utilitário)
- **PostCSS**: ^8.4.47 (processador CSS)
- **Autoprefixer**: ^10.4.20 (prefixos CSS automáticos)

### Qualidade de Código
- **ESLint**: ^8.46.0 (linter JavaScript)

## 📋 Pré-requisitos

- Node.js 18+ (recomendado: v22.17.0 ou superior)
- npm 8+ (recomendado: v10.9.2 ou superior)

## 🛠️ Instalação e Execução

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar em modo desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

### 3. Build para produção
```bash
npm run build
npm run preview
```

### 4. Verificar qualidade do código
```bash
npm run lint
```

## ⚙️ Configuração de Ambiente

### Desenvolvimento Local
O projeto utiliza `local_config_backup.json` (gitignored) para configuração local do Firebase.

### Produção (Vercel)
Configure as seguintes variáveis de ambiente no dashboard do Vercel:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

## 📁 Estrutura do Projeto

```
├── public/
│   └── imagens/          # Assets estáticos (imagens)
├── src/
│   ├── main.js           # Ponto de entrada da aplicação
│   ├── styles.css        # Estilos globais
│   ├── ui/
│   │   ├── App.js        # Componente principal
│   │   ├── Comic.js      # Componente de quadrinhos
│   │   ├── Tests.js      # Sistema de testes
│   │   └── Contacts.js   # Sistema de contatos
│   ├── services/
│   │   └── firebase.js   # Configuração e serviços Firebase
│   └── utils/
│       └── dom.js        # Utilitários DOM
├── index.html            # Template HTML principal
├── manifest.json         # Manifesto PWA
└── sw.js                # Service Worker
```

## 🎮 Funcionalidades

- **Quadrinhos Interativos**: Visualização de painéis com animações GSAP
- **Sistema de Testes**: Testes de conhecimento com feedback visual
- **Tome de Contatos**: Sistema de gerenciamento de contatos com Firebase
- **Animações**: Transições suaves e efeitos visuais
- **Responsivo**: Interface adaptável para diferentes dispositivos

## 🔒 Segurança

- Configurações sensíveis do Firebase são mantidas em variáveis de ambiente
- Backup local não é versionado (`.gitignore`)
- Recomenda-se revisar as regras de segurança do Firestore

## 🚀 Deploy

O projeto está configurado para deploy no Vercel com suporte a:
- Build automático via Vite
- Variáveis de ambiente para configuração do Firebase
- Otimização automática de assets

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa verificação de código

## 🔄 Melhorias Futuras

- [ ] Testes unitários com Vitest
- [ ] Mock do Firestore para desenvolvimento offline
- [ ] CI/CD com GitHub Actions
- [ ] Otimização de performance com lazy loading
- [ ] Suporte a PWA completo