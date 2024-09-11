import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';

export default class Game extends Component<any, any> {

  render(): ComponentChild {
    return (
      <div class="route-home flex flex-column justify-center align-center">
        Game
      </div>
    );
  }

}