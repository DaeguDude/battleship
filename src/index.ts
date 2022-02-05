import { Game } from "./game";
import { View } from "./view/view";
import "./style.css";
import { Model } from "./model/model";

new Game(new View(), new Model()).start();
