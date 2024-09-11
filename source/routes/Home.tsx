import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';

export default class Home extends Component<any, any> {

  render(): ComponentChild {
    return (
      <div class="route-home flex flex-column justify-center align-center">
        Home
      </div>
    );
  }

}