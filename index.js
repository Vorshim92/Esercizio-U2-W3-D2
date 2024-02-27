// Crea un semplice form di registrazione con un input field in cui l’utente possa inserire il proprio nome. A fianco di questo input field crea due pulsanti: uno salverà il valore in localStorage, uno rimuoverà il valore precedentemente salvato (se presente). Mostra sopra l’input field il valore precedentemente salvato, se presente.

const storageKey = "names-memory";
const eventNameInput = document.getElementById("nome");

const saveBtn = document.getElementById("salva");
const removeBtn = document.getElementById("remove");
const form = document.querySelector("form");

const save = (e) => {
  e.preventDefault();
  const newName = eventNameInput.value;

  // GESTIAMO IL DATO NELLO STORAGE:
  const savedEvents = localStorage.getItem(storageKey);

  if (savedEvents) {
    // se siamo qui, significa che sarà verosimilmente un SECONDO INVIO, per un secondo elemento, ed è già presente un array (in foramto stringa) nel localStorage!

    // 1) convertire la stringa del dato nella versione nativa
    const savedEventsArr = JSON.parse(savedEvents);
    // 2) sull'array convertito pushamo il nuovo evento
    savedEventsArr.push(newName);
    savedEventsArr.shift();

    // 3) ri-salvare l'array modificato
    localStorage.setItem(storageKey, JSON.stringify(savedEventsArr));
  } else {
    const events = [];
    events.push(newName);
    localStorage.setItem(storageKey, JSON.stringify(events));
  }
  // FINE GESTIONE STORAGE

  // SVUOTAMENTO CAMPI FORM
  //   form.reset();
  generateName();
};

const remove = (e) => {
  const savedEvents = localStorage.getItem(storageKey);

  if (savedEvents) {
    localStorage.removeItem(storageKey);
  }
  form.reset();
  generateName();
};

const generateName = () => {
  const savedEvents = localStorage.getItem(storageKey);
  const nomeAggiunto = document.getElementById("nome-salvato");

  if (savedEvents) {
    const savedEventsArr = JSON.parse(savedEvents);
    nomeAggiunto.innerText = "Nome Salvato: ";

    nomeAggiunto.innerText = `Nome Salvato: ${savedEventsArr[savedEventsArr.length - 1]}`;
  } else {
    nomeAggiunto.innerText = "Nome Salvato: ";
  }
};
window.onload = () => {
  form.addEventListener("submit", save);
  removeBtn.addEventListener("click", remove);

  generateName();
};
