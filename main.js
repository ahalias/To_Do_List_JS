newTask = document.getElementById("input-task")
addButton = document.getElementById("add-task-button")
taskList = document.getElementById("task-list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
for (let item=0; item<tasks.length; item++) {
    if (tasks[item]["isChecked"] === true) {
        updateTaskList(tasks[item]["task"], "checked")
    } else {
        updateTaskList(tasks[item]["task"], "unchecked")
    }
}


addButton.addEventListener("click", () => {
    if (newTask.value !== "") {
        updateTaskList(newTask.value, "unchecked")
        updateLocalStorage()
        newTask.value = ""
    }
})


document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
    })
})


function remove(item) {
    item.parentNode.remove()
    updateLocalStorage()
}

document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
        updateLocalStorage()
    })
})

function updateLocalStorage() {
    let storObj = []
    for (let item of taskList.querySelectorAll("li")) {
        storObj.push({"task": item.querySelector("span").innerText, "isChecked": item.querySelector("input").checked})
    }
    localStorage.setItem("tasks", JSON.stringify(storObj))
}

function updateTaskList(text, checkboxStatus) {
    let taskInstance = document.createElement("li")
    taskInstance.innerHTML = `<input type="checkbox" ${checkboxStatus}><span class="task">${text}</span>
                <button type="submit" class="delete-btn" onClick="remove(this)">x</button>`
    taskList.appendChild(taskInstance)
}
