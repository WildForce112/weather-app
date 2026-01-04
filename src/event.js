import { Renderer } from "./render.js"
import { projects, getProjectFromList } from "./projectLogic.js";
import { createNewTodo } from "./todoLogic.js";
import { populateStorage } from "./storage.js"

const formDisplay = document.querySelector('.hidden');
const form = document.querySelector('#todo-form');
const title = form.querySelector('#title');
const dueDate = form.querySelector('#due');

function resetForm () {
  title.value = '';
  dueDate.value = '';
  formDisplay.style.display = 'none';
}

function getProject(e) {
  const target = e.target;
  const projectID = target.closest(".project").dataset.id;
  return getProjectFromList(projectID)
}

function getTodo(e, project) {
  const target = e.target;
  const todoID = target.closest(".todo").dataset.id;
  return project.getTodoFromProject(todoID)
}

function getProjectFromButton(e) {
  const target = e.target;
  const projectID = target.closest(".project-button").dataset.id;
  return getProjectFromList(projectID)
}

function handleTodoEvents() {
  const mainProject = getProjectFromList(document.querySelector('main>.project').dataset.id);
  document.body.addEventListener('click', (e) => {
    if(e.target.closest('main')){
      if(e.target.closest('.complete-state')){
        const button = e.target.closest('.complete-state');
        if (!button) return;
        const targetProject = getProject(e);
        const targetTodo = getTodo(e, targetProject);
        targetTodo.changeTodoCompleteState();
        populateStorage(projects)
        Renderer.renderCompleteState(targetTodo);
      }
      else if(e.target.closest('.delete-button')){
        const button = e.target.closest('.delete-button');
        if (!button) return;
        const targetProject = getProject(e);
        const targetTodo = getTodo(e, targetProject);
        targetProject.deleteTodoFromProject(targetTodo);
        populateStorage(projects);
        Renderer.renderProject(targetProject);
      }
    }
    else if(e.target.closest('nav')){
      if(e.target.closest(".project-button")){
        const targetProject = getProjectFromButton(e);
        Renderer.renderProject(targetProject);
      }
      else if(e.target.closest('.todo-button')){
        formDisplay.style.display = form.style.display == "flex" ? "none" : "flex";
      }
    }
    else if(e.target.closest('#todo-form>:last-child')){
      switch (e.target.textContent) {
        case 'Close': {
          e.preventDefault();
          resetForm();
        }
        case 'Add': {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleValue = title.value;
            const dueValue = dueDate.value;
            const day = new Date(dueValue)
            const newTodo = createNewTodo(titleValue, day.setDate(day.getDate()));
            mainProject.addTodoToProject(newTodo);
            populateStorage(projects)
            Renderer.renderProject(mainProject);
            resetForm();
          })
        }
      }
    }
  });
}

export { handleTodoEvents };
