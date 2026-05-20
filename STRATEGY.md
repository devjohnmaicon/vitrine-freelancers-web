# Vitrine Freelancers — Estratégia & Estrutura do Projeto

> Documento de referência para acompanhamento do produto, monetização e arquitetura.

---

## 1. Visão do Produto

Plataforma de conexão rápida entre **empresas** que precisam de mão-de-obra pontual e **freelancers** disponíveis no momento. O diferencial é a urgência: cada vaga fica ativa por **12 horas**, criando um ciclo diário de novas oportunidades e visitas recorrentes — comportamento ideal para monetização com anúncios de display.

### Perfis de usuário

| Perfil       | O que faz na plataforma                                              |
|--------------|----------------------------------------------------------------------|
| **Empresa**  | Publica vagas, visualiza candidatos, edita e encerra oportunidades   |
| **Freelancer** | Navega vagas abertas, candidata-se, acompanha suas candidaturas   |
| **Visitante** | Visualiza home e lista de vagas (sem candidatura)                  |

---

## 2. Estrutura da Aplicação

### Rotas (Next.js App Router)

```
/                                   → Home (hero + features + últimas vagas)
/vagas                              → Listagem de vagas abertas (pública)
/vagas/detalhes/[id]                → Detalhe da vaga (pública)
/login                              → Login de empresa
/register                           → Cadastro (empresa ou usuário)
/sobre                              → Sobre a plataforma
/contato                            → Contato
/denied                             → Acesso negado
/vagas/minhas-vagas                 → Vagas da empresa logada (protegida)
/vagas/minhas-vagas/new             → Criar nova vaga (protegida)
/vagas/minhas-vagas/edit/[id]       → Editar vaga (protegida)
/vagas/minhas-vagas/[id]/candidatos → Ver candidatos da vaga (protegida)
/vagas/minhas-candidaturas          → Candidaturas do freelancer (protegida)
```

### Componentes principais

```
src/
├── app/
│   ├── page.tsx                          # Home
│   ├── layout.tsx                        # Layout raiz (providers, header, footer)
│   ├── globals.css
│   ├── actions/
│   │   ├── jobs-service.ts               # CRUD de vagas (server actions)
│   │   ├── applications-service.ts       # Candidaturas (server actions)
│   │   └── logout.ts
│   ├── api/auth/[...nextauth]/           # Handler Auth.js
│   └── (public)/
│       ├── vagas/
│       │   ├── page.tsx                  # Listagem pública
│       │   ├── layout.tsx
│       │   ├── detalhes/[id]/page.tsx    # Detalhe da vaga
│       │   └── (private)/
│       │       ├── minhas-vagas/         # Gestão de vagas (empresa)
│       │       └── minhas-candidaturas/  # Candidaturas (freelancer)
│       ├── login/page.tsx
│       ├── register/page.tsx + forms/
│       ├── sobre/page.tsx
│       ├── contato/page.tsx
│       └── denied/page.tsx
│
├── components/
│   ├── card/
│   │   ├── CardRoot.tsx                  # Container do card de vaga
│   │   ├── CardHeader.tsx                # Avatar empresa + badge tipo + tempo restante
│   │   ├── CardContent.tsx               # Cargo, data/horário, valor, localização
│   │   └── CardActions.tsx               # Slot de ações (ex: "Ver detalhes")
│   ├── header/
│   │   ├── HeaderComponent.tsx
│   │   ├── HeaderIdentity.tsx            # Logo
│   │   ├── HeaderNavigation.tsx          # Links de navegação
│   │   ├── HeaderActions.tsx             # Login/registro ou perfil
│   │   ├── HeaderMobile.tsx              # Menu mobile (Sheet)
│   │   └── HeaderProfile.tsx             # Dropdown de perfil autenticado
│   ├── apply-button.tsx                  # Botão candidatar-se (client component)
│   ├── modal-close-job.tsx               # Modal de encerrar vaga
│   ├── calendar-component.tsx
│   ├── breadcump-component.tsx
│   ├── footer-component.tsx
│   ├── home-section-two.tsx              # Seção "Últimas vagas" na home
│   ├── tax-value.tsx
│   ├── error-message.tsx
│   ├── job-not-found.tsx
│   ├── loading-button.tsx
│   ├── logout-button.tsx
│   └── ui/                               # Componentes shadcn/ui
│
├── types/
│   ├── Job.ts                            # Job, JobType, CompanyType, AddressType
│   ├── Application.ts
│   ├── session.ts                        # ExtendedSession, ExtendedToken
│   ├── Header.ts
│   ├── Requests.ts
│   └── schemas/z.ts                      # Schemas Zod
│
├── lib/
│   ├── api-client.ts                     # apiFetch helper (fetch com cache/tags)
│   ├── utils.ts                          # cn(), getJobTypeDisplayName()
│   └── zod.ts
│
├── hooks/
│   └── use-mobile.ts
│
└── providers/
    └── auth-provider.tsx                 # SessionProvider
```

### Modelo de dados — `Job`

| Campo               | Tipo       | Descrição                              |
|---------------------|------------|----------------------------------------|
| `id`                | number     | Identificador                          |
| `type`              | `FIXO` \| `FREELANCER` | Tipo de contrato             |
| `position`          | string     | Cargo/função                           |
| `description`       | string     | Descrição da oportunidade              |
| `requirements`      | string?    | Requisitos do candidato                |
| `date`              | string     | Data de trabalho                       |
| `startTime`         | string     | Hora de início                         |
| `endTime`           | string     | Hora de término                        |
| `dailyValue`        | number     | Valor da diária (R$)                   |
| `taxValues`         | string?    | Valores taxados                        |
| `open`              | boolean?   | Vaga aberta                            |
| `openUntil`         | string?    | Prazo de encerramento (12h rule)       |
| `applicationsCount` | number?    | Qtd. de candidatos                     |
| `companyId`         | number?    | ID da empresa                          |
| `companyName`       | string?    | Nome da empresa                        |

### Stack tecnológica

| Camada        | Tecnologia                                    |
|---------------|-----------------------------------------------|
| Framework     | Next.js 14+ (App Router, Server Components)   |
| Linguagem     | TypeScript                                    |
| Estilo        | Tailwind CSS + shadcn/ui                      |
| Autenticação  | Auth.js v5 (NextAuth) — Credentials provider  |
| Backend       | Java Spring Boot (`vitrine-freelancers-server`) |
| Mock API      | JSON Server (`db.json`, porta 3333)           |
| Validação     | Zod                                           |
| Datas         | date-fns + locale pt-BR                       |
| Ícones        | Lucide React                                  |

---

## 3. Estratégia de Monetização — Google AdSense

### 3.1 Por que AdSense é viável aqui

- **Alto volume de visitas recorrentes:** vagas novas a cada 12h incentivam visitas diárias.
- **Audiência qualificada:** trabalhadores buscando renda pontual — perfil com alto interesse em anúncios de emprego, cursos, serviços financeiros e apps de entrega (categorias de alto CPM).
- **Conteúdo de texto abundante:** Google AdSense exige conteúdo original substancial — as páginas de detalhe de vaga e a listagem atendem esse critério.
- **Custo zero de implementação:** sem necessidade de backend adicional, apenas o script do AdSense.

### 3.2 Páginas elegíveis para anúncios

| Página                  | Prioridade | Justificativa                                         |
|-------------------------|------------|-------------------------------------------------------|
| `/vagas`                | **Alta**   | Maior tráfego orgânico, feed de conteúdo longo        |
| `/vagas/detalhes/[id]`  | **Alta**   | Usuário engajado, lê descrição — ideal para display   |
| `/` (Home)              | **Média**  | Visibilidade, mas sessão curta                        |
| `/sobre`                | Baixa      | Pouco tráfego, bom para conformidade mínima           |
| `/contato`              | Baixa      | Idem                                                  |

> **Páginas proibidas para anúncios:** `/login`, `/register`, `/denied` e qualquer rota protegida (`(private)`). O Google não permite anúncios em páginas de login/cadastro.

### 3.3 Posicionamento dos anúncios

#### `/vagas` — Listagem de vagas

```
┌─────────────────────────────────────┐
│  Título: "Vagas disponíveis"        │
├─────────────────────────────────────┤
│  Card de vaga 1                     │
│  Card de vaga 2                     │
│  Card de vaga 3                     │
├─────────────────────────────────────┤
│  ░░░ ANÚNCIO IN-FEED (728×90) ░░░  │  ← após card 3
├─────────────────────────────────────┤
│  Card de vaga 4                     │
│  Card de vaga 5                     │
│  Card de vaga 6                     │
├─────────────────────────────────────┤
│  ░░░ ANÚNCIO IN-FEED (728×90) ░░░  │  ← após card 6
└─────────────────────────────────────┘
```

**Tipo recomendado:** `In-feed ads` (nativos) — mesclam visualmente com o feed, maior CTR.
**Intervalo:** 1 anúncio a cada 3 cards.

#### `/vagas/detalhes/[id]` — Detalhe da vaga

```
┌─────────────────────────────────────┐
│  Header azul (cargo + empresa)      │
│  Info grid (data, valor, local)     │
│  Descrição da vaga                  │
│  Requisitos                         │
├─────────────────────────────────────┤
│  ░░░ ANÚNCIO DISPLAY (336×280) ░░░ │  ← entre conteúdo e botão
├─────────────────────────────────────┤
│  [Candidatar-se]                    │
└─────────────────────────────────────┘
```

**Tipo recomendado:** `Display ad` responsivo — se adapta ao mobile.

#### `/` — Home

```
┌─────────────────────────────────────┐
│  Hero (CTA principal)               │
│  Features (3 colunas)               │
├─────────────────────────────────────┤
│  ░░ ANÚNCIO BANNER (970×90) ░░░░░  │  ← entre features e últimas vagas
├─────────────────────────────────────┤
│  Últimas vagas (3 cards)            │
└─────────────────────────────────────┘
```

### 3.4 Implementação técnica

#### Passo 1 — Adicionar o script do AdSense no `layout.tsx`

```tsx
// src/app/layout.tsx
import Script from "next/script";

// Dentro do <head> ou no <body> do layout raiz:
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

> Substituir `ca-pub-XXXXXXXXXXXXXXXXX` pelo Publisher ID obtido no painel do AdSense.

#### Passo 2 — Criar o componente `AdBanner`

```tsx
// src/components/ad-banner.tsx
"use client";
import { useEffect } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
}

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className={`overflow-hidden text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

#### Passo 3 — Uso nos componentes

```tsx
// Em /vagas/page.tsx — entre os cards (a cada 3)
import AdBanner from "@/components/ad-banner";

{jobList.map((job, index) => (
  <>
    <Card.Root key={index} ...>...</Card.Root>
    {(index + 1) % 3 === 0 && (
      <AdBanner slot="SLOT_FEED_VAGAS" format="fluid" className="my-2" />
    )}
  </>
))}
```

```tsx
// Em /vagas/detalhes/[id]/page.tsx — antes do botão candidatar
<AdBanner slot="SLOT_DETALHE_VAGA" format="rectangle" className="my-4" />
```

### 3.5 Conformidade com políticas do AdSense

| Regra                              | Status atual          | Ação necessária                         |
|------------------------------------|-----------------------|-----------------------------------------|
| Conteúdo original e substancial    | ✅ Vagas com texto real | Garantir descrição mínima de 100 chars |
| Não exibir em páginas de login     | ✅ Rotas protegidas separadas | Confirmar que AdBanner não é chamado lá |
| Máximo 3 anúncios por página       | A implementar         | Respeitar o limite por rota             |
| Não clicar nos próprios anúncios   | Responsabilidade do dono | Usar conta separada para testes        |
| Política de privacidade            | ❌ Pendente            | **Criar página `/politica-privacidade`** |
| Aviso de cookies (LGPD/GDPR)      | ❌ Pendente            | **Adicionar banner de consentimento**   |

### 3.6 Estimativa de receita

> Estimativas baseadas em benchmarks do nicho de emprego/trabalho no Brasil.

| Métrica                  | Estimativa conservadora |
|--------------------------|-------------------------|
| CPM médio (R$)           | R$ 3 – R$ 8             |
| CTR médio                | 0,3% – 1,2%             |
| CPC médio (R$)           | R$ 0,20 – R$ 0,80       |
| Sessões/mês para R$100   | ~15.000 – 30.000        |

**Segmentos de maior CPM para este público:** cursos profissionalizantes, apps de renda extra (iFood, Uber), cartões de crédito, microcrédito, planos de saúde acessíveis.

### 3.7 Ações prioritárias antes de submeter ao AdSense

1. [ ] **Política de Privacidade** — criar página `/politica-privacidade` (obrigatório)
2. [ ] **Banner de consentimento de cookies** — LGPD + requisito do Google
3. [ ] **Domínio próprio publicado** — AdSense não aprova `localhost` ou subdomínios gratuitos
4. [ ] **Conteúdo mínimo** — garantir ao menos 10-15 vagas publicadas no momento da revisão
5. [ ] **Adicionar `ads.txt`** na raiz do domínio (`/public/ads.txt`)
6. [ ] **Submeter sitemap** ao Google Search Console para indexação das vagas

### 3.8 `ads.txt` (obrigatório)

Criar o arquivo em `public/ads.txt`:

```
google.com, pub-XXXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

---

## 4. Próximas funcionalidades sugeridas (impacto em tráfego/receita)

| Feature                              | Impacto no tráfego | Impacto no AdSense |
|--------------------------------------|--------------------|--------------------|
| SEO das páginas de vaga (metadata dinâmica) | **Alto** | **Alto** — mais sessões orgânicas |
| Filtros de vaga (cidade, tipo, valor) | Médio              | Médio — mais páginas visitadas |
| Notificações por e-mail de novas vagas | Alto              | Alto — visitas recorrentes |
| Perfil público do freelancer         | Médio              | Médio              |
| Categorias/tags de vaga              | Alto               | Alto — SEO de cauda longa |
| Página `/politica-privacidade`       | Baixo              | **Crítico** — requisito AdSense |

---

*Documento gerado em 20/05/2026. Atualizar conforme o produto evolui.*
