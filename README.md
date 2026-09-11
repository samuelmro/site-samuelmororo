# samuelmororo.com

Site acadêmico estático. HTML + CSS + ~60 linhas de JS. Sem build, sem dependências,
sem `npm install`. Abrir `index.html` no navegador já mostra o site.

```
index.html        Home — bio, interesses, destaques
research.html     Working papers, publicados, em andamento
projects.html     Índice dos projetos especiais
projects/         Um arquivo .html por texto
assets/css/style.css   Toda a aparência do site
assets/js/site.js      Só os botões de idioma e tema
assets/img/            Foto e imagens
assets/cv.pdf          O CV. O link "CV" do menu abre esse PDF direto, em
                       nova aba — não existe página de CV no site.
```

## Rodar localmente

```bash
python -m http.server 4321
```

Depois abra <http://localhost:4321>. Não é obrigatório — abrir o arquivo direto
funciona —, mas com servidor os caminhos se comportam igual ao site publicado.

## Bilíngue: como funciona

Os dois idiomas ficam no HTML. Um elemento com `class="en"` aparece em inglês,
com `class="pt"` aparece em português, e o CSS esconde o que não está ativo.
O botão PT/EN troca o atributo `data-lang` no `<html>` e guarda a escolha.

```html
<span class="en">Working paper, 2026</span>
<span class="pt">Working paper, 2026</span>
```

Duas consequências práticas: sem JavaScript o site cai em inglês e continua
inteiramente legível; e cada texto novo precisa das duas versões. Se só existe
em um idioma, escreva o mesmo texto nas duas tags — melhor que uma lacuna.

## Adicionar um working paper

Copie um bloco `<div class="paper">` em `research.html` e troque o conteúdo.
Nada mais precisa mudar.

```html
<div class="paper">
  <h3>Título do paper</h3>
  <p class="meta">
    <span class="en">2026, with Coautor</span>
    <span class="pt">2026, com Coautor</span>
  </p>
  <p class="abstract en">Abstract…</p>
  <p class="abstract pt">Resumo…</p>
  <p class="files"><a href="assets/papers/nome.pdf">PDF</a></p>
</div>
```

## Escrever um texto novo

1. Copie `projects/exemplo.html` com outro nome, ex. `projects/hhi-varejo.html`.
2. Troque o `<title>`, o `<h1>`, a data e o corpo.
3. Adicione um `<li>` em `projects.html` apontando para o arquivo novo, com a
   data e uma linha dizendo do que se trata.

Os textos não são bilíngues: cada um fica no idioma em que você escreveu, e o
índice avisa qual é. Só o menu do site troca de idioma. Escrever tudo duas vezes
mataria a vontade de publicar, que é o ponto da seção.

Já estão estilizados no `exemplo.html`: subtítulo, lista, citação, tabela
(rola sozinha se for larga demais) e figura com legenda. Apague o que não usar.

## Aparência

Sem fonte carregada, sem cor de acento, sem tema escuro. O corpo é serifado
(Georgia, com Iowan Old Style e Charter como alternativas) a 17px, e o texto é
preto no branco. Tabelas são a única exceção: ficam em sans, porque os
algarismos da Georgia são antigos e descem abaixo da linha, o que atrapalha
comparar números em coluna.

Toda a aparência cabe em `assets/css/style.css`. As variáveis no topo do arquivo
(`--text`, `--rule`, `--link`, `--serif`) controlam o site inteiro.

## Publicar

O caminho mais simples e gratuito é GitHub Pages:

1. Crie um repositório e suba estes arquivos.
2. Settings → Pages → Source: `Deploy from a branch`, branch `main`, pasta `/`.
3. Em Custom domain, coloque `samuelmororo.com`. Isso cria um arquivo `CNAME`.
4. No DNS do domínio, aponte para o GitHub:
   - `A` em `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` em `www` → `<seu-usuario>.github.io`
5. Volte em Settings → Pages e marque **Enforce HTTPS** (aparece depois que o DNS propaga).

Se comprar o domínio na Cloudflare, o DNS já está lá — é só criar os registros acima.
Para os registros `A` do GitHub, deixe o proxy **desligado** (nuvem cinza).

## Antes de publicar, revise

- [ ] Trocar `seu@email.com` (aparece nas 4 páginas e no rodapé)
- [ ] Colocar a foto em `assets/img/` e apontar o `src` em `index.html`
- [ ] Colocar o CV em `assets/cv.pdf`
- [ ] Preencher todo texto entre colchetes `[...]`
- [ ] Trocar os `href="#"` dos links (Scholar, SSRN, GitHub, LinkedIn)
- [ ] Conferir o ano no rodapé
- [ ] Apagar o item de exemplo em `projects.html` quando o primeiro texto real entrar
