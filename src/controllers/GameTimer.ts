import { getRandomInteger } from "../lib/getRandomInteger";

class _GameTimer {

    private tickCount: number = 0;
    private tickHandlers: Array<(tick: number) => void> = [];
    private nextTick: NodeJS.Timeout | undefined;
    public isRunning: boolean = false;

    public multiplier: number = 0;

    start() {
        this.isRunning = true;
        setTimeout(() => this.tick());
    }

    pause() {
        this.isRunning = false;
        clearTimeout(this.nextTick);
    }

    stop() {
        this.isRunning = false;
        clearTimeout(this.nextTick);
    }

    onTick(handler: (tick: number) => void): number {
        this.tickHandlers.push(handler);
        return this.tickHandlers.length - 1;
    }

    getTickDelay(): number {
        let randomTime = getRandomInteger(1000, 3000) - (this.multiplier * 300);
        return Math.max(300, randomTime);
    }

    private tick() {
        if (!this.isRunning) { return; }
        this.tickHandlers.forEach((handler) => {
            if (!this.isRunning) { return; }
            handler(this.tickCount);
        });
        this.nextTick = setTimeout(() => this.tick(), this.getTickDelay());
    }

}

export const GameTimer = new _GameTimer();