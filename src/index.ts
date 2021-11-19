import { Controller } from "./controller/controller";
import { Model } from "./model/model";
import { View } from "./view/view";

// import { game } from "./game";
import "./style/style.css";

// game();

new Controller(new Model(), new View());
