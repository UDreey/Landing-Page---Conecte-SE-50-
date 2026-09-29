const getElement = (id) => document.getElementById(id);

const modal = getElement("modal");
const form = getElement("signupForm");
const successMessage = getElement("formSuccess");

const modalModes = {
  login: {
    title: "Entrar",
    introduction:
      "Acesse com seu e-mail e senha. Esta é uma demonstração: nenhum dado é enviado.",
    button: "Entrar",
    success: "Login demonstrativo realizado com sucesso!",
  },
  signup: {
    title: "Cadastre-se",
    introduction:
      "Preencha os dados para simular o primeiro contato com a plataforma.",
    button: "Enviar cadastro",
    success: "Cadastro demonstrativo enviado com sucesso!",
  },
};

let currentMode = "signup";
let previousFocus = null;

function openModal(mode) {
  currentMode = mode;
  const modeDetails = modalModes[currentMode];

  previousFocus = document.activeElement;
  modal.dataset.mode = currentMode;
  getElement("modalTitle").textContent = modeDetails.title;
  getElement("modalIntro").textContent = modeDetails.introduction;
  getElement("submitBtn").textContent = modeDetails.button;

  form
    .querySelectorAll(
      `.only-${currentMode} input, .only-${currentMode} textarea`,
    )
    .forEach((field) => (field.required = true));

  const otherMode = currentMode === "login" ? "signup" : "login";
  form
    .querySelectorAll(`.only-${otherMode} input, .only-${otherMode} textarea`)
    .forEach((field) => (field.required = false));

  successMessage.classList.remove("visible");
  modal.classList.add("open");
  document.body.classList.add("modal-open");

  setTimeout(() => {
    form.querySelector(`.only-${currentMode} input`).focus();
  }, 30);
}

function closeModal() {
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");

  if (previousFocus) {
    previousFocus.focus();
  }
}

document.querySelectorAll("[data-modal]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    if (trigger.tagName === "A") {
      event.preventDefault();
    }

    openModal(trigger.dataset.modal);
  });
});

modal.querySelector("[data-close-modal]").addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    closeModal();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = [
    ...modal.querySelectorAll("button, input, textarea"),
  ].filter((element) => element.offsetParent !== null);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

getElement("age").addEventListener("input", (event) => {
  const age = Number(event.target.value);
  const hasInvalidAge = event.target.value && age < 50;

  event.target.setCustomValidity(
    hasInvalidAge ? "O Conecte-SE 50+ é para pessoas com 50 anos ou mais." : "",
  );
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = modalModes[currentMode].success;
  successMessage.classList.add("visible");
  form.reset();
});

const menuButton = getElement("menuBtn");
const menu = getElement("menu");

menuButton.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.textContent = isOpen ? "Fechar" : "Menu";
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", false);
    menuButton.textContent = "Menu";
  }
});

document.querySelectorAll(".icon, .avatar").forEach((element) => {
  element.setAttribute("aria-hidden", "true");
});
