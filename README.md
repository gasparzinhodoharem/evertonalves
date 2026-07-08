# Everton Alves — Advogado Trabalhista

Site institucional estático (HTML/CSS/JS puro, sem build), publicado via Cloudflare Pages.

## Estrutura
- `index.html` — landing page
- `servicos/` — 11 páginas de áreas de atuação
- `blog/` — índice + 10 artigos (SEO / conteúdo orgânico)
- `styles.css`, `main.js` — design system e interações
- `sitemap.xml`, `robots.txt` — SEO
- `logo.png`, `everton-alves.jpg`, `assets_*` — imagens

## SEO
Cada página tem `<title>`/description únicos, canonical, Open Graph, Twitter Card e dados
estruturados JSON-LD (Attorney, Service, BlogPosting, BreadcrumbList). `sitemap.xml` lista
as 23 URLs e é referenciado no `robots.txt`.

## Trocar o domínio (quando o domínio final for comprado)
A base canônica atual é `https://everton-alves-site.pages.dev`. Para migrar para o domínio
definitivo, basta um find-and-replace em todo o repositório:

```bash
grep -rl 'everton-alves-site.pages.dev' . --include='*.html' --include='*.xml' --include='*.txt' \
  | xargs sed -i 's#everton-alves-site\.pages\.dev#SEU-DOMINIO.com.br#g'
```

Depois, cadastre o domínio no Cloudflare Pages e reenvie o `sitemap.xml` no Google Search Console.
