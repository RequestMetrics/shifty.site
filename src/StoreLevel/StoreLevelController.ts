import { GameTimer } from "../controllers/GameTimer";
import { SoundController } from "../controllers/SoundController";
import { getRandomInteger } from "../lib/getRandomInteger";

const WIDGET_COUNT = 7;
const MODAL_X_ADJUST = 40;
const MODAL_Y_ADJUST = 40;

export interface StoreLevelState {
    cart: number
    clicks: number
    hasShownExperienceModal: boolean
    isObjectiveVisible: boolean
    showExperienceModal: boolean
    showExperienceThanksModal: boolean
    showFailModal: boolean
    modalAdjustX?: number
    modalAdjustY?: number
    widgets: WidgetState[]
}

export interface WidgetState {
    index: number
    status: WidgetStatus
}

export enum WidgetStatus {
    EMPTY,
    LOADING,
    CONTENT,
    OBJECTIVE,
    COMPLETE
}

class _StoreLevelController {

    getState!: () => StoreLevelState;
    setState!: (state: any) => void;

    init(getState: () => StoreLevelState, setState: (state: any) => void) {

        this.getState = getState;
        this.setState = setState;

        GameTimer.onTick(() => this.onTick());

        let initialState: StoreLevelState = {
            cart: 0,
            clicks: 0,
            hasShownExperienceModal: false,
            isObjectiveVisible: false,
            showExperienceModal: false,
            showExperienceThanksModal: false,
            showFailModal: false,
            widgets: []
        };

        for (var i = 0; i < WIDGET_COUNT; i++) {
            let widget = {
                index: i,
                status: WidgetStatus.EMPTY
            };
            initialState.widgets.push(widget);
        }

        this.setState({ ...initialState });
    }

    onTick() {
        let state = this.getState();

        let unloadedWidgets = state.widgets.filter((w) => w.status === WidgetStatus.EMPTY);
        if (unloadedWidgets.length) {
            let loaded = 0;
            unloadedWidgets.forEach((w) => {
                if (loaded > 3) { return; }
                this.setLoading(w);
                this.updateWidgetState(w);
                loaded++;
            });
            return;
        }

        let changeableWidgets = state.widgets.filter((w) => w.status !== WidgetStatus.LOADING);
        if (!changeableWidgets.length) { return; }

        let widget = changeableWidgets[getRandomInteger(0, changeableWidgets.length)];

        if (widget.status === WidgetStatus.OBJECTIVE) {
            this.setState({ isObjectiveVisible: false });
        }

        this.setLoading(widget);
        this.updateWidgetState(widget);
    }

    private setLoading(widget: WidgetState) {
        widget.status = WidgetStatus.LOADING;
        setTimeout(() => {
            if (!GameTimer.isRunning) { return; }

            SoundController.play("load");
            let state = this.getState();
            if (!state.isObjectiveVisible && widget.index >= 3) {
                this.setState({ isObjectiveVisible: true });
                widget.status = WidgetStatus.OBJECTIVE;
            }
            else {
                widget.status = WidgetStatus.CONTENT;
            }
            this.updateWidgetState(widget);
        }, GameTimer.getTickDelay())
    }

    click(index: number, event: Event) {
        event.stopPropagation();
        event.preventDefault();

        let state = this.getState();
        let widget = state.widgets[index];

        state.clicks = state.clicks + 1;

        if (widget && widget.status === WidgetStatus.OBJECTIVE) {
            SoundController.play("cart_add");

            widget.status = WidgetStatus.COMPLETE;
            this.updateWidgetState(widget);

            state.cart = state.cart + 1;
            state.isObjectiveVisible = false;
            GameTimer.multiplier = state.cart;

            if (!state.hasShownExperienceModal) {
                state.hasShownExperienceModal = true;
                this.setExperienceModal();
            }
        }
        else {
            SoundController.play("click_fail");
            state.showFailModal = true;
            state.modalAdjustX = getRandomInteger(-MODAL_X_ADJUST, MODAL_X_ADJUST);
            state.modalAdjustY = getRandomInteger(-MODAL_Y_ADJUST, MODAL_Y_ADJUST);
        }

        this.setState(state);
    }

    clearFail(event: Event) {
        event.preventDefault();
        SoundController.play("close_fail");
        this.setState({ showFailModal: false });
    }

    doubleFail(event: Event) {
        event.preventDefault();
        SoundController.play("click_fail");
        this.setState({
            showFailModal: true,
            modalAdjustX: getRandomInteger(-MODAL_X_ADJUST, MODAL_X_ADJUST),
            modalAdjustY: getRandomInteger(-MODAL_Y_ADJUST, MODAL_Y_ADJUST)
        });
    }

    clearExperience(event: Event) {
        event.preventDefault();
        SoundController.play("close_fail");
        this.setState({ showExperienceModal: false });
    }

    clickRatings(event: Event) {
        event.preventDefault();
        SoundController.play("click_fail");
        this.setState({
            showExperienceModal: false,
            showExperienceThanksModal: true,
            modalAdjustX: getRandomInteger(-MODAL_X_ADJUST, MODAL_X_ADJUST),
            modalAdjustY: getRandomInteger(-MODAL_Y_ADJUST, MODAL_Y_ADJUST)
        });
    }

    clearRatingsThanks(event: Event) {
        event.preventDefault();
        SoundController.play("close_fail");
        this.setState({ showExperienceThanksModal: false });
    }


    private updateWidgetState(widget: WidgetState) {
        let state = this.getState();
        this.setState({
            widgets: state.widgets.map((w) => {
                if (w.index === widget.index) {
                    return { ...widget };
                }
                return w;
            })
        });
    }

    private setExperienceModal() {
        setTimeout(() => {
            let state = this.getState();
            if (state.showFailModal) { // skip if the fail modal is already showing
                return this.setExperienceModal();
            }

            this.setState({
                showExperienceModal: true,
                modalAdjustX: getRandomInteger(-MODAL_X_ADJUST, MODAL_X_ADJUST),
                modalAdjustY: getRandomInteger(-MODAL_Y_ADJUST, MODAL_Y_ADJUST)
            });
        }, GameTimer.getTickDelay())
    }

}

export const StoreLevelController = new _StoreLevelController();