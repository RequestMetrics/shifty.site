import { h, Component } from "preact";
import { getRandomInteger } from "../util/getRandomInteger";
import { StoreLevelController, WidgetState, WidgetStatus } from "./StoreLevelController";

const CONTENT = [
  // {
  //   width: 100,
  //   content: (
  //     <img src="/assets/images/trending.png" height="468" width="2400" />
  //   )
  // },
  // {
  //   width: 100,
  //   content: (
  //     <img src="/assets/images/best-selling.png" height="468" width="2400" />
  //   )
  // },
  {
    width: 58,
    content: (
      <img src="/assets/images/top-deals.png" height="400" width="1200" />
    )
  },
  {
    width: 58,
    content: (
      <img src="/assets/images/black-friday.png" height="400" width="1200" />
    )
  },
  {
    width: 58,
    content: (
      <img src="/assets/images/macbook-air.png" height="400" width="1200" />
    )
  },
  {
    width: 39,
    content: (
      <img src="/assets/images/smarttvs.png" height="400" width="800" />
    )
  },
  {
    width: 39,
    content: (
      <img src="/assets/images/car-audio.png" height="400" width="800" />
    )
  },
  {
    width: 39,
    content: (
      <img src="/assets/images/galaxy-watch.png" height="400" width="800" />
    )
  },
  {
    width: 39,
    content: (
      <img src="/assets/images/kitchen.png" height="400" width="800" />
    )
  },
  {
    width: 39,
    content: (
      <img src="/assets/images/samsung-galaxy.png" height="400" width="800" />
    )
  },
  {
    width: 39,
    content: (
      <img src="/assets/images/video-games.png" height="400" width="800" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/god-of-war.png" height="600" width="600" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/intex-pool.png" height="600" width="600" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/lenovo-yoga.png" height="600" width="600" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/pokemon.png" height="600" width="600" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/samsung-24.png" height="600" width="600" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/god-of-war.png" height="600" width="600" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/intex-pool.png" height="600" width="600" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/lenovo-yoga.png" height="600" width="600" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/pokemon.png" height="600" width="600" />
    )
  },
  {
    width: 20,
    content: (
      <img src="/assets/images/samsung-24.png" height="600" width="600"  />
    )
  },
]

type RenderOptions = {
  width: number,
  grow?: boolean,
  height?: string,
  content: h.JSX.Element
}

export class Widget extends Component<WidgetState, any> {

  render(): h.JSX.Element {
    if (this.props.status === WidgetStatus.EMPTY) {
      return this.renderWidget({
        width: 0,
        content: null
      });
    }
    else if (this.props.status === WidgetStatus.LOADING) {
      return this.renderWidget({
        width: 20,
        height: "auto",
        grow: true,
        content: (
          <div class="loading"><i class="spinner"></i></div>
        )
      });
    }
    else if (this.props.status === WidgetStatus.CONTENT) {
      return this.renderWidget(this.getRandomContent());
    }
    else if (this.props.status === WidgetStatus.OBJECTIVE) {
      return this.renderWidget({
        width: 20,
        content: (
          <img src="/assets/images/deal-of-the-day.png" height="600" width="600" />
        )
      });
    }
    else if (this.props.status === WidgetStatus.COMPLETE) {
      return this.renderWidget({
        width: 20,
        content: (
          <img src="/assets/images/deal-of-the-day-done.png" height="600" width="600" />
        )
      });
    }
    else {
      throw new Error(`Widget ${this.props.index} in unknown status ${this.props.status}.`);
    }
  }

  renderWidget(opts: RenderOptions) {
    return (
      <div class="widget"
        style={{
          "flex": `${opts.grow ? '1' : '0'} 0 ${opts.width}%`,
          "height": opts.height || "fit-content",
          "display": `${this.props.status === WidgetStatus.EMPTY ? "none" : "flex" }`
        }}
        onTouchStart={ (e) => StoreLevelController.click(this.props.index, e) }>
        {opts.content}
      </div>
    )
  }

  private getRandomContent() : { width: number, content: h.JSX.Element } {
    return CONTENT[getRandomInteger(0, CONTENT.length)];
  }
}