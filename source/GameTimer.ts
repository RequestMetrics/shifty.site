import { DateTime } from "luxon";
import { getRandomInteger } from "./util/getRandomInteger";

class _GameTimer {

  private tickCount: number = 0;
  private tickHandlers: Array<(tick: number) => void> = [];

  public StartedOn: DateTime = DateTime.invalid("initial");

  start() {
    this.StartedOn = DateTime.now();
    this.tick();
  }

  onTick(handler: (tick: number) => void): number {
    this.tickHandlers.push(handler);
    return this.tickHandlers.length - 1;
  }

  tick() {
    this.tickHandlers.forEach((handler) => {
      handler(this.tickCount);
    });
    this.tickCount++;
    setTimeout(() => this.tick(), getRandomInteger(300, 800));
  }

}

export const GameTimer = new _GameTimer();