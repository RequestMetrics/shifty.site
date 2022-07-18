import { DateTime } from "luxon";
import { getRandomInteger } from "./util/getRandomInteger";

enum GameTimerStatus {
  STOPPED,
  STARTED
}

class _GameTimer {

  private tickCount: number = 0;
  private tickHandlers: Array<(tick: number) => void> = [];
  private nextTick: NodeJS.Timer;
  private isRunning: boolean = false;

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

  private tick() {
    if (!this.isRunning) { return; }
    this.tickHandlers.forEach((handler) => {
      handler(this.tickCount);
    });
    this.nextTick = setTimeout(() => this.tick(), getRandomInteger(500, 1000) - (this.multiplier * 200));
  }

}

export const GameTimer = new _GameTimer();