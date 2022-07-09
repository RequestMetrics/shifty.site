import { h, render } from "preact";
import { Game } from "./Game/Game";
import "./main.scss";

const ROOT_ELEMENT = document.querySelector('#app-container') as HTMLElement;

render(<Game />, ROOT_ELEMENT);