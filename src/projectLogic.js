import { createNewTodo } from "./todoLogic";
import { storageAvailable, populateStorage, getStorage } from "./storage.js";
import { parse } from "date-fns";


class project {
  constructor(name, todoList, id = crypto.randomUUID()) {
    this.name = name;
    this.todoList = todoList;
    this.id = id;
  }

  addTodoToProject(todo){
    this.todoList.push(todo);
  }

  getTodoFromProject(id) {
    return this.todoList.find((todo) => todo.id == id);
  }

  deleteTodoFromProject(todo){
    this.todoList = (this.todoList.filter((element) => element.id !== todo.id));
  }
}

function createNewProject(name, todoList, id) {
  return new project(
    name,
    todoList,
    id,
  )
}

function getProjectFromList(id) {
  return projects.find((element) => element.id == id);
}

function parseProjects(parsedObject){
  for(const project of parsedObject) {
    const newProject = createNewProject(project["name"],[],project["id"])
    for(const todo of project.todoList) {
      const newTodo = createNewTodo(todo["title"], todo["dueDate"], todo["completed"], todo["id"])
      newProject.addTodoToProject(newTodo);
    }
    projects.push(newProject);
  }
}

var projects = [];
const day = new Date();

if(!getStorage()){
  const Personal = createNewProject("Personal", []);
  Personal.addTodoToProject(createNewTodo("Buy groceries", day.setDate(day.getDate())));
  Personal.addTodoToProject(createNewTodo("Workout 30 minutes", day.setHours(day.getHours() + 27)));
  projects.push(Personal);
  const School = createNewProject("School", []);
  School.addTodoToProject(createNewTodo("Finish math homework", day.setHours(day.getHours() + 57)));
  School.addTodoToProject(createNewTodo("Prepare presentation", day.setDate(day.getDate() + 6)));
  projects.push(School);
  populateStorage(projects);
}
else {
  parseProjects(getStorage());
}

export {project, createNewProject, projects, getProjectFromList}