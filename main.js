let taskInput = document.getElementById("taskInput");
let createBtn = document.getElementById("createBtn");
let taskList = document.getElementById("taskList");
let list = JSON.parse(localStorage.getItem("tasks")) || [];
let isEditing = false;
let currentIndex = null;

// Aufgaben im LocalStorage speichern
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(list));
}

// Eingabefeld leeren
function clearInput() {
  taskInput.value = "";
}

// Aufgabenliste anzeigen
function showTasks() {
  taskList.innerHTML = "";
  list.forEach((task, index) => {
    let taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <div>
        <input class="checkbox active" type="checkbox" />
        <p>${task}</p>
      </div>
      <span>
        <i onclick="updateTask(${index})" class="fa-solid fa-pen update"></i>
        <i onclick="removeTask(${index})" class="fa-solid fa-trash-can delete"></i>
      </span>
    `;
    taskList.appendChild(taskItem);
  });
}

// Benachrichtigung anzeigen
function showAlert(message, type) {
  // Vorherige Benachrichtigung entfernen (falls vorhanden)
  let existingAlert = document.querySelector(".alertBox");
  if (existingAlert) existingAlert.remove();

  // Benachrichtigung erstellen
  let alertBox = document.createElement("div");
  alertBox.classList.add("alertBox", type);
  alertBox.innerHTML = `
    <span>${message}</span>
    <button class="close-btn">&times;</button>
  `;

  document.body.appendChild(alertBox);

  // Schließen-Button (manuell)
  alertBox.querySelector(".close-btn").addEventListener("click", () => {
    alertBox.remove();
  });

  // Automatisch nach 3 Sekunden entfernen
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// Aufgabe hinzufügen/bearbeiten
function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") {
    showAlert("Eine leere Aufgabe kann nicht hinzugefügt werden!", "error");
    return;
  }

  if (isEditing) {
    list[currentIndex] = taskText;
    createBtn.textContent = "Hinzufügen";
    isEditing = false;
    currentIndex = null;
    showAlert("Die Aufgabe wurde aktualisiert", "success");
  } else {
    list.push(taskText);
    showAlert("Die Aufgabe wurde hinzugefügt", "success");
  }

  saveTasks();
  showTasks();
  clearInput();
}

// Aufgabe löschen
function removeTask(index) {
  list.splice(index, 1);
  showAlert("Die Aufgabe wurde gelöscht", "warning");
  saveTasks();
  showTasks();
}

// Aufgabe bearbeiten
function updateTask(index) {
  taskInput.value = list[index];
  createBtn.textContent = "Aktualisieren";
  isEditing = true;
  currentIndex = index;
}

// Initiale Anzeige der Aufgaben
showTasks();
