import { h, render } from "preact";
import { Game } from "./Game";
import "./main.scss";

const ROOT_ELEMENT = document.querySelector('#app') as HTMLElement;

render(<Game />, ROOT_ELEMENT);