import * as _ from "lodash";
import { Gameboard } from "./Gameboard/Gameboard";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Hello", "ts webpack!"], " ");

  return element;
}

document.body.appendChild(component());
