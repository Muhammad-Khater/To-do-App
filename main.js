let taskInput = document.getElementById("taskInput");
let createBtn = document.getElementById("createBtn");
let taskList = document.getElementById("taskList");
let list = JSON.parse(localStorage.getItem("tasks")) || [];
let isEditing = false;
let currentIndex = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(list));
}

function clearInput() {
  taskInput.value = "";
}

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

function showAlert(message, type) {
  // التحقق من وجود تنبيه سابق وإزالته قبل إضافة الجديد
  let existingAlert = document.querySelector(".alertBox");
  if (existingAlert) existingAlert.remove();

  // إنشاء عنصر التنبيه
  let alertBox = document.createElement("div");
  alertBox.classList.add("alertBox", type);
  alertBox.innerHTML = `
    <span>${message}</span>
    <button class="close-btn">&times;</button>
  `;

  document.body.appendChild(alertBox);

  // زر الإغلاق اليدوي
  alertBox.querySelector(".close-btn").addEventListener("click", () => {
    alertBox.remove();
  });

  // إزالة التنبيه تلقائيًا بعد 3 ثوانٍ
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") {
    showAlert("لا يمكن إضافة مهمة فارغة!", "error");
    return;
  }

  if (isEditing) {
    list[currentIndex] = taskText;
    createBtn.textContent = "إضافة";
    isEditing = false;
    currentIndex = null;
    showAlert("تم تحديث المهمه", "success");
  } else {
    list.push(taskText);
    showAlert("تم اضافة المهمه", "success");
  }

  saveTasks();
  showTasks();
  clearInput();
}

function removeTask(index) {
  list.splice(index, 1);
  showAlert("تم حذف المهمه", "warning");
  saveTasks();
  showTasks();
}

function updateTask(index) {
  taskInput.value = list[index];
  createBtn.textContent = "تحديث";
  isEditing = true;
  currentIndex = index;
}

showTasks();
