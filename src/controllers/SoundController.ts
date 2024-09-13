const SOUND_BASE_PATH: string = "/sounds/";
const SOUND_PATHS = {
    cart_add: "mixkit-unlock-game-notification-253.mp3",
    click_fail: "mixkit-losing-bleeps-2026.mp3",
    close_fail: "mixkit-tech-break-fail-2947.mp3",
    countdown: "mixkit-clock-countdown-bleeps-916.mp3",
    load: "mixkit-positive-game-alert-3151.mp3",
    game_lose: "mixkit-arcade-game-over-3068.mp3",
    game_win: "mixkit-video-game-win-2016.mp3",
    // leaderboard: "mixkit-retro-game-emergency-alarm-1000.mp3"
}

export type Sound = keyof typeof SOUND_PATHS;

class _SoundController {

    private context = new AudioContext();
    private sounds: { [key: string]: AudioBuffer } = {};

    constructor() {
        Object.keys(SOUND_PATHS).forEach((soundKey) => {
            this.getAudioData(`${SOUND_BASE_PATH}/${(SOUND_PATHS as any)[soundKey]}`)
                .then((audioBuffer) => {
                    this.sounds[soundKey] = audioBuffer;
                })
        });
    }

    play(sound: Sound) {
        let source = this.context.createBufferSource();
        source.buffer = this.sounds[sound];
        source.connect(this.context.destination);
        source.start(0);
    }

    getAudioData(url: string): Promise<AudioBuffer> {
        let context = new AudioContext();

        return fetch(url)
            .then((response) => response.arrayBuffer())
            .then((buffer) => context.decodeAudioData(buffer));
    }

}

export const SoundController = new _SoundController();