const form = document.querySelector('#todoAddForm');
const addInput = document.querySelector('#todoName');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const clearBtn = document.querySelector('#clearButton')
const cont = document.querySelector('.container')
const filter = document.querySelector('#todoSearch')

let todos = [];

runEvents();

function runEvents() {
    form.addEventListener('submit',addTodo);
    secondCardBody.addEventListener('click',removeTodoItem)
    clearBtn.addEventListener('click',clearAll)
    document.addEventListener('DOMContentLoaded',pageLoaded)
    filter.addEventListener('keydown',filterTodo)
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo)
    })
}

function addTodo(e) {
  const inputText = addInput.value.trim()
  if(inputText==null || inputText==''){
    showAlert('danger',"Nasıl yani ? Hiç mi bir şey yapmayacaksın ?")
  }else {
    
    addTodoUI(inputText);
    showAlert('warning',"Todo Eklendi!")
    addTodoStorage(inputText);
    
  }
    
  e.preventDefault();

}

function addTodoUI(newTodo) {
    const li = document.createElement('li')
    li.className = 'list-group-item d-flex justify-content-between align-items-center'
    li.textContent = newTodo;

    const a = document.createElement('a')
    a.href = '#';
    a.className = 'delete-item';

    const i = document.createElement('i')
    i.className = 'fa fa-remove'

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li)

    addInput.value = '';
}


function addTodoStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo)
    localStorage.setItem('todos',JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
}

function showAlert(type,message) {
    const div = document.createElement('div');
    div.className = `alert alert-${type} mt-3`;
    div.textContent = message;

    cont.appendChild(div)

    setTimeout(() => {
        div.remove()
    }, 2000);
}
    

function removeTodoItem(e) {
    if(e.target.className==='fa fa-remove'){
        const todo = e.target.parentElement.parentElement;
        todo.remove()
        
        removeTodoStorage(todo.textContent)
        showAlert("success","Todo başarıyla Silindi!")
    }
}


function removeTodoStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function(todo,index) {
        if(removeTodo===todo) {
            todos.splice(index,1)
        }
    });
    localStorage.setItem('todos',JSON.stringify(todos)); 
}

function clearAll() {
   const todoEl = document.querySelectorAll('.list-group-item');
   if (todoEl.length > 0) {
    todoEl.forEach(function(todo) {
        todo.remove();
    })
    // Storage'den Silme
    todos = [];
    localStorage.setItem('todos',JSON.stringify(todos));
    showAlert('success',"Başarılı bir şekilde Silindi!")
   } else {
     showAlert('warning',"Silmek için en az bir tane Todo eklemelisiniz!")
   }
}

function filterTodo(e) {
    const filter = e.target.value.toLowerCase().trim();
    const todoGroup = document.querySelectorAll('.list-group-item');

    if(todoGroup.length > 0) {
        todoGroup.forEach(function(todo){
           
            if(todo.textContent.toLowerCase().trim().includes(filter)){
                
                todo.setAttribute("style","display : block");
            
            }else {
                
                todo.setAttribute("style", "display : none !important");
            }
        });
    
    
    }else {
        showAlert("warning","Filtreleme yapmak için en az bir todo olmalı !")
    }
    
}
    


    
    



