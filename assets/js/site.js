/* Uma unica funcao: trocar o idioma e lembrar a escolha.
   A definicao inicial acontece no <script> do <head>, antes da primeira
   pintura. Sem JS, o site fica em ingles e continua inteiro. */

(function () {
  "use strict";
  var root = document.documentElement;

  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    try { localStorage.setItem("lang", lang); } catch (e) {}

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      // O botao nomeia o idioma para o qual o visitante vai trocar.
      btn.textContent = lang === "pt" ? "English" : "Português";
    });
  }

  document.addEventListener("click", function (ev) {
    if (ev.target.closest("[data-lang-toggle]")) {
      setLang(root.getAttribute("data-lang") === "pt" ? "en" : "pt");
    }
  });

  setLang(root.getAttribute("data-lang") || "en");
})();
