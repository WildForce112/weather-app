class todo {
  constructor(title, dueDate, completed, id = crypto.randomUUID()){
    this.title = title;
    this.dueDate = dueDate;
    this.completed = completed;
    this.id = id;
    this.priority = 0;
  }

  changeTodoCompleteState() {
    this.completed = !this.completed;
  }
}

function createNewTodo(title, dueDate, completed, id) {
  return new todo(title,
    dueDate,
    completed,
    id,
  )
}

export {todo, createNewTodo}