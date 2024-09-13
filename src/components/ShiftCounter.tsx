import { h, Component } from "preact";
import { GameController } from "@/controllers/GameController";
import { GameTimer } from "@/controllers/GameTimer";
import { getRandomInteger } from "@/lib";

import "./ShiftCounter.css";

/**
 * The LayoutShift interface of the Performance API provides insights into the layout stability of web pages based on movements of the elements on the page.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift)
 */
interface CustomLayoutShift extends PerformanceEntry {
    readonly value: number;
}

interface ShiftCounterState {
    cls: number
}

export class ShiftCounter extends Component<any, ShiftCounterState> {

    private observer: PerformanceObserver | undefined;

    constructor() {
        super();
        this.state = {
            cls: 0
        };
    }

    componentDidMount(): void {

        GameController.onStart(() => {

            if (!self.PerformanceObserver ||
                !PerformanceObserver.supportedEntryTypes ||
                !PerformanceObserver.supportedEntryTypes.includes("layout-shift")) {
                console.info("approximating layout shift value on unsupported browser");
                GameTimer.onTick((tick) => {
                    let cls = this.state.cls;
                    cls = cls + ((getRandomInteger(5000, 10000) + (tick)) / 10000);
                    this.setState({ cls });
                    GameController.cls = cls;
                })
            }
            else {
                let cls = this.state.cls;
                this.observer = new PerformanceObserver((list: PerformanceObserverEntryList) => {
                    Promise.resolve().then(() => {
                        (list.getEntries() as CustomLayoutShift[]).forEach((entry) => {
                            cls += entry.value
                        });
                        this.setState({ cls });
                    })
                    this.setState({ cls });
                    GameController.cls = cls;
                });
                this.observer.observe({ type: "layout-shift", buffered: false });
            }
        })

    }

    componentWillUnmount(): void {
        this.observer?.disconnect();
    }

    render(): h.JSX.Element {
        return (
            <div class="shift-counter flex align-center">
                <div class="label">CLS</div>
                <div class="value">
                    {this.state.cls.toFixed(4)}
                </div>
            </div>
        )
    }
}