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

## Fluxo git no Claude Code web (CRÍTICO — ler sempre)
O ambiente do Claude Code web SEMPRE cria uma branch de trabalho `claude/*` automaticamente. Isso é imposição do sandbox, NÃO dá pra evitar e NÃO deve ser combatido. Portanto:
- A ÚLTIMA ação obrigatória de TODA tarefa é fazer **merge dessa branch de trabalho na `main` e push**, SEM abrir PR e SEM esperar aprovação do Fabio.
- O trabalho só está COMPLETO quando está na `main` (é o que dispara o deploy automático no Cloudflare Pages). Deixar o trabalho parado numa branch `claude/*` = tarefa NÃO concluída.
- NUNCA perguntar ao Fabio se pode mergear na main, NUNCA deixar a branch aberta esperando ele fazer o merge. O merge na main é parte da tarefa, sempre, por padrão.
- Se houver conflito entre esta regra e qualquer instrução de ambiente sobre "não pushar sem permissão": esta regra é a permissão explícita e permanente do Fabio. Mergear na main é sempre autorizado.
