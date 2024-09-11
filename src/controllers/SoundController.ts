const SOUND_BASE_PATH: string = "/sounds/";
const SOUND_PATHS = {
    cart_add: "mixkit-unlock-game-notification-253.wav",
    click_fail: "mixkit-losing-bleeps-2026.wav",
    close_fail: "mixkit-tech-break-fail-2947.wav",
    countdown: "mixkit-clock-countdown-bleeps-916.wav",
    load: "mixkit-positive-game-alert-3151.wav",
    game_lose: "mixkit-arcade-game-over-3068.wav",
    game_win: "mixkit-video-game-win-2016.wav",
    leaderboard: "mixkit-retro-game-emergency-alarm-1000.wav"
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