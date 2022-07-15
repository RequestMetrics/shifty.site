import { h, Component } from "preact";
import { getRandomInteger } from "../util/getRandomInteger";
import { StoreLevelController, WidgetState, WidgetStatus } from "./StoreLevelController";

/*
  OBJ: 3x Free Gifts, 3x Added
  Loading
  10x
    1. Black Friday Sale
    2. Clearance
    3. Top Deals
    4. Back to School


*/

const CONTENT = [
  {
    width: 100,
    content: (
      <img src="/assets/images/trending.png" height="556" width="2400" />
    )
  },
  {
    width: 100,
    content: (
      <img src="/assets/images/best-selling.png" height="556" width="2400" />
    )
  },
  {
    width: 50,
    content: (
      <img src="/assets/images/top-deals.png" height="500" width="1200" />
    )
  },
  {
    width: 50,
    content: (
      <img src="/assets/images/macbook-air.png" height="500" width="1200" />
    )
  },
  {
    width: 33,
    content: (
      <img src="/assets/images/smarttvs.png" height="400" width="800" />
    )
  },
  {
    width: 33,
    content: (
      <img src="/assets/images/car-audio.png" height="400" width="800" />
    )
  },
  {
    width: 33,
    content: (
      <img src="/assets/images/galaxy-watch.png" height="400" width="800" />
    )
  },
  {
    width: 33,
    content: (
      <img src="/assets/images/kitchen.png" height="400" width="800" />
    )
  },
  {
    width: 33,
    content: (
      <img src="/assets/images/samsung-galaxy.png" height="400" width="800" />
    )
  },
  {
    width: 33,
    content: (
      <img src="/assets/images/video-games.png" height="400" width="800" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/god-of-war.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/intex-pool.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/lenovo-yoga.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/pokemon.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/samsung-24.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/god-of-war.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/intex-pool.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/lenovo-yoga.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/pokemon.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
    )
  },
  {
    width: 25,
    content: (
      <img src="/assets/images/samsung-24.png" height="600" width="600"  style="border: 1px solid rgb(197, 203, 213)" />
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
        width: 25,
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
        width: 25,
        content: (
          <img src="/assets/images/deal-of-the-day.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
        )
      });
    }
    else if (this.props.status === WidgetStatus.COMPLETE) {
      return this.renderWidget({
        width: 25,
        content: (
          <img src="/assets/images/deal-of-the-day-done.png" height="600" width="600" style="border: 1px solid rgb(197, 203, 213)" />
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

  private getRandomWidth() : number {
    const WIDTHS = [25,25,25,25,25,33,33,33,33,33,50,50,100];
    return WIDTHS[getRandomInteger(0, WIDTHS.length)];
  }

  private getRandomHeight() : number {
    const HEIGHTS = [50,100,200];
    return HEIGHTS[getRandomInteger(0, HEIGHTS.length)];
  }

  private getRandomContent() : { width: number, content: h.JSX.Element } {
    return CONTENT[getRandomInteger(0, CONTENT.length)];
  }
}