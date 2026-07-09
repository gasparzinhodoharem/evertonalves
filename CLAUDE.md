# Contexto do projeto

Este projeto é hospedado no **Cloudflare Pages** (git-connected), NÃO na Lovable.

## Deploy
- Deploy é AUTOMÁTICO no push para `main`. O Cloudflare Pages builda sozinho.
- NUNCA instrua "publicar na Lovable" ou "publish pelo editor Lovable" — o projeto saiu da Lovable.
- Não há passo de publish manual. Commitar e pushar para `main` já publica.

## Regras gerais
- Antes de trabalhar: `git fetch` + `git checkout main` + `git pull` para sincronizar com origin/main.
- SEMPRE commitar direto no `main`. NUNCA criar branch, NUNCA abrir PR, salvo se eu pedir explicitamente. O teste é feito em produção — o commit no `main` é o fluxo padrão e esperado.
- Nunca expor detalhes técnicos de erro ao usuário final.
- Sem em-dashes em texto (usar vírgulas).
