document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list");
    const newTodoTextField = document.getElementById("new-todo-text")

    document.getElementById("add-todo-button").addEventListener("click", () => {
        let newTodoText = newTodoTextField.value.trim();

        const validationMessage = document.querySelector(".validation-message");

        validationMessage.style.display = "none";

        if (newTodoText.length === 0) {
            validationMessage.style.display = "block";
            return;
        }

        const newTodoElement = document.createElement("li");

        setViewMode();

        todoList.appendChild(newTodoElement);

        newTodoTextField.value = "";

        function setViewMode() {
            newTodoElement.innerHTML = `
            <div class="todo-element">
                <span class="todo-text"></span>
                    <button class="button" type="button" id="edit-button">Редактировать</button>
                    <button class="button" type="button" id="delete-button">Удалить</button>
            </div>`;

            newTodoElement.querySelector(".todo-text").textContent = newTodoText;

            newTodoElement.querySelector("#delete-button").addEventListener("click", () => {
                newTodoElement.remove();
            });

            newTodoElement.querySelector("#edit-button").addEventListener("click", () => {
                setEditMode();
            });
        }

        function setEditMode() {
            newTodoElement.innerHTML = `
            <div class="todo-element">
                <input class="edit-field">                
                    <button class="button" type="button" id="save-button">Сохранить</button>
                    <button class="button" type="button" id="cancel-button">Отменить</button>
                    <div style="display: none;" class="edit-validation-message">Необходимо ввести текст заметки!</div>
            </div>`;

            const editTodoTextField = newTodoElement.querySelector(".edit-field");
            editTodoTextField.value = newTodoText;

            newTodoElement.querySelector("#save-button").addEventListener("click", () => {
                const editedTodoText = editTodoTextField.value.trim()
                const validationMessage = document.querySelector(".edit-validation-message");

                if (editedTodoText.length === 0) {
                    validationMessage.style.display = "block";
                } else {
                    validationMessage.style.display = "none";
                    newTodoText = editedTodoText
                    setViewMode();
                }
            });

            newTodoElement.querySelector("#cancel-button").addEventListener("click", () => {
                setViewMode();
            });
        }
    });
});