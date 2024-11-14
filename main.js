// selecionar todos os cabecalho__lista-item
document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
  // adicionar um ouvinte de evento mouseover
  item.addEventListener("mouseover", () => alternarSubmenu(item, true));

  // adcionar um ouvinte de evento mouseout
  item.addEventListener("mouseout", () => alternarSubmenu(item, false));

  item.addEventListener("click", () => {
    const submenu = item.querySelector(".submenu");

    const isDisplayed = submenu.style.display === "block";

    alternarSubmenu(item, !isDisplayed);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    alternarModal("ver-modal-inscrito", false);
    alternarModal("ver-modal-contato", false);
    alternarModal("ver-modal-enviado", false);

    document.querySelectorAll(".cabecalho__nav--lista").forEach((item) => {
      alternarSubmenu(item, false);
    });
  }
});

function gerenciarFocoModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);
  const elementosModal = modal.querySelectorAll(
    'a, button, input, textarea, select,  [tabindex]:not([tabindex="-1"])'
  );
  const primeiroElemento = elementosModal[0];
  const ultimoElemento = elementosModal[elementosModal.length - 1];
  primeiroElemento.focus();

  modal.addEventListener("keydown", (event) => {
    //  Se a tecla tab for pressionada
    if (event.key === "Tab") {
      // se a tecla shift for pressionada
      if (event.shiftKey) {
        // se o elemento ativo for o primeiro elemento do modal
        if (document.activeElement === primeiroElemento) {
          // evitar o comportamento padrao
          event.preventDefault();
          // focar no ultimo elemento
          ultimoElemento.focus();
        }
      } else {
        // se o elemento ativo for o ultimo elemento do modal ou não pertencer ao modal
        if (
          document.activeElement === ultimoElemento ||
          !modal.contains(document.activeElement)
        ) {
          // evitar o comportamento padrao
          event.preventDefault();
          // focar no primeiro elemento
          primeiroElemento.focus();
        }
      }
    }
  });
}

function alternarModal(modalId, mostrar) {
  const modal = document.querySelector(`#${modalId}`);
  if (modal) {
    modal.style.display = mostrar ? "block" : "none";
    document.body.style.overflow = mostrar ? "hidden" : "auto";
  }
}

function alternarSubmenu(item, mostrar) {
  const submenu = item.querySelector(".submenu");
  if (submenu) {
    mostrar
      ? (submenu.style.display = "block")
      : (submenu.style.display = "none");
    const menuItem = item.querySelector(".cabecalho__lista-item a");
    menuItem.setAttribute("aria-expanded", mostrar ? true : false);
    const DropDownExpandedIcon = item.querySelector(
      ".material-symbols-outlined.icone"
    );
    DropDownExpandedIcon.classList.toggle("active", mostrar);
  }
}

function limpaCampoInput(containerIdInput) {
  document.querySelectorAll(`.${containerIdInput} input`).forEach((input) => {
    input.value = "";
  });
}

/*
 * Accordian
 */

document.querySelectorAll(".botao-acordeao").forEach((button) => {
  button.addEventListener("click", () => alternarAcordeao(button));
});

function alternarAcordeao(button) {
  const isAlreadyOpen = button.getAttribute("aria-expanded") === "true";

  document.querySelectorAll(".botao-acordeao").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
    const conteudo = btn.nextElementSibling;
    conteudo.classList.remove("expandido");
    conteudo.setAttribute("aria-hidden", "true");
  });

  console.log(isAlreadyOpen);

  if (!isAlreadyOpen) {
    console.log(isAlreadyOpen);
    button.setAttribute("aria-expanded", "true");
    const conteudo = button.nextElementSibling;
    conteudo.classList.add("expandido");
    conteudo.setAttribute("aria-hidden", "false");
  }
}
