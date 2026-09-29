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

Duas colunas. À esquerda, fixa ao rolar, a coluna de identidade: o nome numa
linha só, entre o fio duplo (grosso em cima, fino embaixo), a afiliação em
itálico, a foto (só na home, em preto e branco via CSS), o menu, contato e o
botão de idioma. À direita, o conteúdo, em seções com o rótulo em versalete na
margem, separadas só por espaço. A primeira seção começa num fio grosso na mesma altura do fio do nome.
Abaixo de 900px vira uma coluna só.

Fonte: Source Serif 4, carregada do Google Fonts, com Georgia como reserva.
Fundo quase branco (`--paper`), texto quase preto (`--ink`) e um único acento
vinho (`--accent`), usado só no hover dos links e nas citações. Tabelas em sans com algarismos tabulares.

A foto do site é `assets/img/portrait-web.jpg` (520px, ~40 KB). O original em
alta fica em `portrait.jpg` e não é carregado pelas páginas.

Toda a aparência cabe em `assets/css/style.css`; as variáveis no topo
controlam o site inteiro. O aside se repete em cada página: se mudar o menu ou
o contato, mude nas quatro.

## Publicar

O site é servido pelo GitHub Pages, a partir do repositório
`samuelmro/site-samuelmororo`, no domínio `samuelmororo.com` (registrado no Namecheap).
O arquivo `CNAME` na raiz já contém o domínio — não apague.

### 1. GitHub Pages

1. No repositório: Settings → Pages → Source: `Deploy from a branch`, branch `main`, pasta `/ (root)`.
2. Em **Custom domain**, confirme `samuelmororo.com` e clique em Save.
3. Pages grátis exige repositório **público** (em privado só com GitHub Pro).

### 2. DNS no Namecheap

Domain List → `samuelmororo.com` → **Manage**.

- Na aba **Domain**, em *Nameservers*, deixe **Namecheap BasicDNS**.
- Na aba **Advanced DNS**, em *Host Records*, apague o que o Namecheap cria
  sozinho (o `CNAME www → parkingpage.namecheap.com` e o `URL Redirect` em `@`)
  e adicione:

| Type         | Host  | Value                  | TTL       |
|--------------|-------|------------------------|-----------|
| A Record     | `@`   | `185.199.108.153`      | Automatic |
| A Record     | `@`   | `185.199.109.153`      | Automatic |
| A Record     | `@`   | `185.199.110.153`      | Automatic |
| A Record     | `@`   | `185.199.111.153`      | Automatic |
| CNAME Record | `www` | `samuelmro.github.io.` | Automatic |

Opcional (IPv6), quatro `AAAA Record` em `@`: `2606:50c0:8000::153`,
`2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

Registros de e-mail (MX, TXT) que existirem podem ficar.

### 3. HTTPS

A propagação costuma levar de minutos a algumas horas. Quando Settings → Pages
mostrar "DNS check successful", marque **Enforce HTTPS** (o certificado pode
levar mais uns minutos para sair). `www.samuelmororo.com` redireciona sozinho
para `samuelmororo.com`.

Para conferir o DNS pelo terminal:

```bash
dig samuelmororo.com +short        # os quatro 185.199.x.153
dig www.samuelmororo.com +short    # samuelmro.github.io. e os IPs
```

## Antes de publicar, revise

- [ ] Trocar `seu@email.com` (aparece nas 4 páginas e no rodapé)
- [ ] Colocar a foto em `assets/img/` e apontar o `src` em `index.html`
- [ ] Colocar o CV em `assets/cv.pdf`
- [ ] Preencher todo texto entre colchetes `[...]`
- [ ] Conferir o ano no rodapé
- [ ] Apagar o item de exemplo em `projects.html` quando o primeiro texto real entrar
