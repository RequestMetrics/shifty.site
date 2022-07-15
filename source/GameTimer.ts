import { DateTime } from "luxon";
import { getRandomInteger } from "./util/getRandomInteger";

class _GameTimer {

  private tickCount: number = 0;
  private tickHandlers: Array<(tick: number) => void> = [];
  private nextTick: NodeJS.Timer;

  public StartedOn: DateTime = DateTime.invalid("initial");
  public multiplier: number = 0;

  start() {
    this.StartedOn = DateTime.now();
    this.tick();
  }

  pause() {
    clearTimeout(this.nextTick);
  }

  onTick(handler: (tick: number) => void): number {
    this.tickHandlers.push(handler);
    return this.tickHandlers.length - 1;
  }

  private tick() {
    this.tickHandlers.forEach((handler) => {
      handler(this.tickCount);
    });
    this.tickCount++;
    this.nextTick = setTimeout(() => this.tick(), getRandomInteger(500, 1000) - (this.multiplier * 200));
  }

}

export const GameTimer = new _GameTimer();