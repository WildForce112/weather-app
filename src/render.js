import { format } from "date-fns";


const Renderer = (() => {
  const mainBody = document.querySelector('main');
  const navBar = document.querySelector('nav');
  const createCell = (todo) => {
    const cell = document.createElement('div');
    cell.classList.add('todo');
    cell.dataset.id = todo.id;
    
    const container = document.createElement('div');
    container.classList.add('container');

    const completeState = document.createElement('div');
    completeState.classList.add('complete-state');
    completeState.textContent = todo.completed ? '\u2713' : '';

    const info = document.createElement('div');
    info.classList.add('info');

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = todo.title;

    const now = new Date();
    const timeleft = (todo.dueDate - now)/24/60/60/1000;

    const timeLeftDisplay = document.createElement('div');
    timeLeftDisplay.classList.add('time-left');
    if(timeleft > 0) timeLeftDisplay.textContent = `Due in ${Math.round(timeleft)} days`;
    else timeLeftDisplay.textContent = `Overdue by ${Math.round(timeleft) * -1} days`;

    const dueDate = document.createElement('div');
    dueDate.classList.add('due-date');
    dueDate.textContent = `Due Date: ${format(todo.dueDate, "dd-MM-yyyy")}`;

    if(timeleft < 1){
      todo.priority = 3;
    }
    else if(timeleft < 2){
      todo.priority = 2;
    }
    else if(timeleft < 5){
      todo.priority = 1;
    }
    else {
      todo.priority = 0;
    }

    renderPriority(cell, todo);

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add("delete-button");
    deleteBtn.textContent = "\u2715"

    info.append(title, timeLeftDisplay, dueDate);
    container.append(completeState, info);
    cell.append(container, deleteBtn);

    return cell;
  }

  const renderTodo = (todo, container) => {
    const cell = createCell(todo);
    container.appendChild(cell);
  };

  const renderCompleteState = (todo) => {
    const cell = document.querySelector(`.todo[data-id="${todo.id}"]`);
    if (!cell) return;
    const completeState = cell.querySelector('.complete-state');
    completeState.textContent = todo.completed ? '\u2713' : '';
  };

  const renderPriority = (cell, todo) => {
    switch (todo.priority) {
      case 3: {
        cell.style.backgroundColor = "red";
        return;
      }
      case 2: {
        cell.style.backgroundColor = "orange";
        return;
      }
      case 1: {
        cell.style.backgroundColor = "yellow";
        return;
      }
      case 0: {
        cell.style.backgroundColor = "green";
        return;
      }
    }
  }

  const renderProject = (project) => {
    clear();
    const container = document.createElement('div');
    container.dataset.id = project.id;
    container.classList.add('project');
    mainBody.appendChild(container);

    for (const item of project.todoList) {
      renderTodo(item, container);
    }
  }

  const renderNav = (projects) => {
    const todoAdd = document.createElement('button');
    todoAdd.classList.add('todo-button');
    todoAdd.textContent = "Add New Task";
    navBar.appendChild(todoAdd);
    renderProjectList(projects);
  }

  const renderProjectList = (projects) => {
    const projectsText = document.createElement('div');
    projectsText.textContent = 'Projects';
    projectsText.classList.add("project-text");
    navBar.appendChild(projectsText);
    const projectContainer = document.createElement('div');
    for(const item of projects) {
      const project = document.createElement('div');
      project.classList.add('project-button');
      project.dataset.id = item.id;
      project.textContent = item.name;
      projectContainer.appendChild(project);
    }
    navBar.appendChild(projectContainer);
  }

  const clear = () => {
    mainBody.innerHTML = '';
  };

  const init = (projects) => {
    renderProject(projects[0]);
    renderNav(projects);
  }

  return {
    renderProject,
    renderCompleteState,
    clear,
    init,
  };

})();
export {Renderer}