import { h, render } from "preact";
import "./main.scss";

const ROOT_ELEMENT = document.querySelector('#app-container') as HTMLElement;

render(<h1>hey</h1>, ROOT_ELEMENT);