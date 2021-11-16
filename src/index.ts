import { Controller } from "./controller/controller";
import { Model } from "./model/model";
import { View } from "./view/view";

// import { game } from "./game";
import "./style/style.css";

// game();

const app = new Controller(new Model(), new View());
console.log(app);
