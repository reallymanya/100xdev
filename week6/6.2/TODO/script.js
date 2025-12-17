window.onload = function(){
    const token = localStorage.getItem("token");
    if(token){
         showTodoSection();
        loadTodos();
    }
    else {
    showAuthSection();
    }
}

function showAuthSection() {
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("todo-section").style.display = "none";
}

function showTodoSection() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("todo-section").style.display = "block";
}

async function signup(){
    const username = document.getElementById("auth-username").value;
    const password = document.getElementById("auth-password").value;

    try{
        const res = await axios.post("/signup",{username,password});
        document.getElementById("auth-message").textContent = res.data.message;
    } catch(err){
        document.getElementById("auth-message").textContent = "Signup failed!";
    }
}

async function signin() {
  const username = document.getElementById("auth-username").value;
  const password = document.getElementById("auth-password").value;

  try{
    const res = await axios.post("/signin", {username,password});
    localStorage.setItem("token", res.data.token);

    showTodoSection();
    loadTodos();
  }catch (err) {
    document.getElementById("auth-message").textContent = "Invalid username or password";
}
}

function logout() {
  localStorage.removeItem("token");
  showAuthSection();
}

async function loadTodos(){
    const token = localStorage.getItem("token");

 const  res = await axios.get("/todos", {
    headers: { token },
  });

  const listContainer = document.getElementById("task-container");
  listContainer.innerHTML = ""; 

  res.data.todos.forEach((todo)=>{
    const li = document.createElement("li");
     li.setAttribute("data-id", todo.id);

     li.textContent = todo.text;
     if (todo.completed) li.classList.add("checked");

     let delBtn = document.createElement("span");
     delBtn.innerHTML = "×";
     delBtn.classList.add("delete");
     li.appendChild(delBtn);

     let editBtn = document.createElement("span");
    editBtn.innerHTML = "✏️";
    editBtn.classList.add("edit");
    li.appendChild(editBtn);

    listContainer.appendChild(li);
  });
}

async function addTask(){
    const input = document.getElementById("input-box");
    const text = input.value;

    if (text === "") {
    alert("Please enter a task.");
    return;
  }

   const token = localStorage.getItem("token");

   await axios.post("/todos",{text},{
    headers: {token},
   });

   input.value = "";
  loadTodos();
}


document.getElementById("task-container").addEventListener("click",async function(e){
    const li = e.target.closest("li");
    if (!li) return;

    const id = li.getAttribute("data-id");
    const token = localStorage.getItem("token");

    if(e.target.tagName === "LI"){
        const completed = !li.classList.contains("checked");

        await axios.put(`/todos/${id}`,{completed},{ headers: { token } });
        loadTodos();
    }

    if(e.target.classList.contains("delete")){
         await axios.delete(`/todos/${id}`, { headers: { token } });
        loadTodos();
    }

    if(e.target.classList.contains("edit")){
        const currentText = li.firstChild.textContent;
        const newtext = prompt("Edit task:", currentText);

         if (newtext !== null) {
        await axios.put(`/todos/${id}`, { text: newtext }, { headers: { token } });
      loadTodos();
    }
}
});

function searchTasks() {
  const searchValue = document.getElementById("search-box").value.toLowerCase();
  const tasks = document.querySelectorAll("#task-container li");

  tasks.forEach(li => {
    const text = li.firstChild.textContent.toLowerCase();

    if (text.includes(searchValue)) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
}

document.getElementById("search-box").addEventListener("input", searchTasks);