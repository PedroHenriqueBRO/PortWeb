(function () {
  const chaveTemaSalvo = "portfolio_tema_pedro";
  const documentoHtml = document.documentElement;
  const botaoAlternarTema = document.getElementById("botaoAlternarTema");
  const linksNavegacao = document.querySelectorAll('a[href^="#"]');

  function obterTemaSalvo() {
    const temaArmazenado = localStorage.getItem(chaveTemaSalvo);
    if (temaArmazenado === "claro" || temaArmazenado === "escuro") {
      return temaArmazenado;
    }
    return "escuro";
  }

  function aplicarTema(temaAtual) {
    documentoHtml.setAttribute("data-tema", temaAtual);
    localStorage.setItem(chaveTemaSalvo, temaAtual);

    if (botaoAlternarTema) {
      const rotuloBotao = temaAtual === "escuro" ? "Claro" : "Escuro";
      botaoAlternarTema.textContent = rotuloBotao;
      botaoAlternarTema.setAttribute(
        "aria-label",
        "Ativar tema " + rotuloBotao.toLowerCase()
      );
    }
  }

  function alternarTema() {
    const temaAtual = documentoHtml.getAttribute("data-tema") || "escuro";
    const proximoTema = temaAtual === "escuro" ? "claro" : "escuro";
    aplicarTema(proximoTema);
  }

  function rolarSuave(evento) {
    const linkClicado = evento.currentTarget;
    const seletorDestino = linkClicado.getAttribute("href");

    if (!seletorDestino || seletorDestino === "#") {
      return;
    }

    const secaoDestino = document.querySelector(seletorDestino);
    if (!secaoDestino) {
      return;
    }

    evento.preventDefault();
    secaoDestino.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // Inicialização do tema
  const temaInicial = obterTemaSalvo();
  aplicarTema(temaInicial);

  if (botaoAlternarTema) {
    botaoAlternarTema.addEventListener("click", alternarTema);
  }

  // Navegação com rolagem suave
  linksNavegacao.forEach(function (linkNavegacao) {
    linkNavegacao.addEventListener("click", rolarSuave);
  });
})();
