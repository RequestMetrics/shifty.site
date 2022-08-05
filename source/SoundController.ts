
export enum sound {
  cart_add = "/assets/sounds/mixkit-unlock-game-notification-253.wav",
  click_fail = "/assets/sounds/mixkit-losing-bleeps-2026.wav",
  close_fail = "/assets/sounds/mixkit-tech-break-fail-2947.wav",
  countdown = "/assets/sounds/mixkit-clock-countdown-bleeps-916.wav",
  load = "/assets/sounds/mixkit-positive-game-alert-3151.wav",
  game_lose = "/assets/sounds/mixkit-arcade-game-over-3068.wav",
  game_win = "/assets/sounds/mixkit-video-game-win-2016.wav",
  leaderboard = "/assets/sounds/mixkit-retro-game-emergency-alarm-1000.wav"
}

class _SoundController {

  private context = new AudioContext();
  private sounds = {};

  constructor() {

    Object.keys(sound).forEach((key) => {
      this.getAudioData(sound[key])
        .then((audioBuffer) => {
          this.sounds[sound[key]] = audioBuffer;
        })
    });

  }

  play(sound: sound) {

    let source = this.context.createBufferSource();
    source.buffer = this.sounds[sound];
    source.connect(this.context.destination);
    source.start(0);
  }

  getAudioData(url:string) : Promise<AudioBuffer> {
    let context = new AudioContext();

    return fetch(url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => context.decodeAudioData(buffer));
  }

}

export const SoundController = new _SoundController();