import { h, Component } from "preact";
import { getRandomInteger } from "../lib/getRandomInteger";
import { StoreLevelController, WidgetState, WidgetStatus } from "./StoreLevelController";

const CONTENT = [
    // {
    //   width: 100,
    //   content: (
    //     <img src="/images/trending.png" height="468" width="2400" />
    //   )
    // },
    // {
    //   width: 100,
    //   content: (
    //     <img src="/images/best-selling.png" height="468" width="2400" />
    //   )
    // },
    {
        width: 58,
        color: "#2964db",
        content: (
            <img src="/images/top-deals.png" height="400" width="1200" />
        )
    },
    {
        width: 58,
        color: "#293038",
        content: (
            <img src="/images/black-friday.png" height="400" width="1200" />
        )
    },
    {
        width: 58,
        color: "#f5f5f7",
        content: (
            <img src="/images/macbook-air.png" height="400" width="1200" />
        )
    },
    {
        width: 39,
        content: (
            <img src="/images/smarttvs.png" height="400" width="800" />
        )
    },
    {
        width: 39,
        content: (
            <img src="/images/car-audio.png" height="400" width="800" />
        )
    },
    {
        width: 39,
        content: (
            <img src="/images/galaxy-watch.png" height="400" width="800" />
        )
    },
    {
        width: 39,
        content: (
            <img src="/images/kitchen.png" height="400" width="800" />
        )
    },
    {
        width: 39,
        content: (
            <img src="/images/samsung-galaxy.png" height="400" width="800" />
        )
    },
    {
        width: 39,
        content: (
            <img src="/images/video-games.png" height="400" width="800" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/god-of-war.png" height="600" width="600" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/intex-pool.png" height="600" width="600" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/lenovo-yoga.png" height="600" width="600" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/pokemon.png" height="600" width="600" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/samsung-24.png" height="600" width="600" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/god-of-war.png" height="600" width="600" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/intex-pool.png" height="600" width="600" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/lenovo-yoga.png" height="600" width="600" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/pokemon.png" height="600" width="600" />
        )
    },
    {
        width: 20,
        content: (
            <img src="/images/samsung-24.png" height="600" width="600" />
        )
    },
]

type RenderOptions = {
    width: number,
    grow?: boolean,
    height?: string,
    content: h.JSX.Element,
    color?: string
}

export class Widget extends Component<WidgetState, any> {

    render(): h.JSX.Element {
        if (this.props.status === WidgetStatus.EMPTY) {
            return this.renderWidget({
                width: 0,
                content: (<></>)
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
                    <img src="/images/deal-of-the-day.png" height="600" width="600" draggable={false} />
                )
            });
        }
        else if (this.props.status === WidgetStatus.COMPLETE) {
            return this.renderWidget({
                width: 20,
                content: (
                    <img src="/images/deal-of-the-day-done.png" height="600" width="600" draggable={false} />
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
                    "background-color": `${opts.color || 'white'}`,
                    "flex": `1 0 ${opts.width}%`,
                    "display": `${this.props.status === WidgetStatus.EMPTY ? "none" : "flex"}`
                }}
                onMouseDown={(e) => StoreLevelController.click(this.props.index, e)}
                onTouchStart={(e) => StoreLevelController.click(this.props.index, e)}>
                {opts.content}
            </div>
        )
    }

    private getRandomContent(): { width: number, content: h.JSX.Element } {
        return CONTENT[getRandomInteger(0, CONTENT.length)];
    }
}