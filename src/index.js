import "./styles.css";
import { projects } from "./projectLogic.js";
import { Renderer } from './render.js';
import { handleTodoEvents } from "./event.js";

(function () {
  Renderer.init(projects);
  handleTodoEvents();
})();
