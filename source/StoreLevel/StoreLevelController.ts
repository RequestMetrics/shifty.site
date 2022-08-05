import { GameController } from "../GameController";
import { GameTimer } from "../GameTimer";
import { sound, SoundController } from "../SoundController";
import { getRandomInteger } from "../util/getRandomInteger";

const WIDGET_COUNT = 10;
const MODAL_X_ADJUST = 40;
const MODAL_Y_ADJUST = 40;

export interface StoreLevelState {
  cart: number
  clicks : number
  hasShownExperienceModal: boolean
  isObjectiveVisible : boolean
  showExperienceModal: boolean
  showExperienceThanksModal: boolean
  showFailModal : boolean
  modalAdjustX : number
  modalAdjustY : number
  widgets : WidgetState[]
}

export interface WidgetState {
  index : number
  status : WidgetStatus
}

export enum WidgetStatus {
  EMPTY,
  LOADING,
  CONTENT,
  OBJECTIVE,
  COMPLETE
}

class _StoreLevelController {

  getState: () => StoreLevelState;
  setState: (state: any) => void;

  init(getState: () => StoreLevelState, setState: (state: any) => void) {

    this.getState = getState;
    this.setState = setState;

    GameTimer.onTick(() => this.onTick());

    let initialState = {
      cart: 0,
      clicks: 0,
      hasShownExperienceModal: false,
      isObjectiveVisible: false,
      showExperienceModal: false,
      showExperienceThanksModal: false,
      showFailModal: false,
      widgets: []
    };

    for(var i = 0; i < WIDGET_COUNT; i++) {
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
      SoundController.play(sound.load);
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

    let state = this.getState();
    let widget = state.widgets[index];

    state.clicks = state.clicks + 1;

    if (widget && widget.status === WidgetStatus.OBJECTIVE) {
      SoundController.play(sound.cart_add);

      widget.status = WidgetStatus.COMPLETE;
      this.updateWidgetState(widget);

      state.cart = state.cart + 1;

      if (!state.hasShownExperienceModal) {
        state.hasShownExperienceModal = true;
        state.showExperienceModal = true;
        state.modalAdjustX = getRandomInteger(-MODAL_X_ADJUST,MODAL_X_ADJUST);
        state.modalAdjustY = getRandomInteger(-MODAL_Y_ADJUST,MODAL_Y_ADJUST);
      }

      state.isObjectiveVisible = false;
      GameTimer.multiplier = state.cart;

    }
    else {
      SoundController.play(sound.click_fail);
      state.showFailModal = true;
      state.modalAdjustX = getRandomInteger(-MODAL_X_ADJUST,MODAL_X_ADJUST);
      state.modalAdjustY = getRandomInteger(-MODAL_Y_ADJUST,MODAL_Y_ADJUST);
    }

    this.setState(state);
  }

  clearFail() {
    SoundController.play(sound.close_fail);
    this.setState({ showFailModal: false });
  }

  doubleFail() {
    SoundController.play(sound.click_fail);
    this.setState({
      showFailModal: true,
      modalAdjustX: getRandomInteger(-MODAL_X_ADJUST,MODAL_X_ADJUST),
      modalAdjustY: getRandomInteger(-MODAL_Y_ADJUST,MODAL_Y_ADJUST)
    });
  }

  clearExperience() {
    SoundController.play(sound.close_fail);
    this.setState({ showExperienceModal: false });
  }

  clickRatings() {
    SoundController.play(sound.click_fail);
    this.setState({
      showExperienceModal: false,
      showExperienceThanksModal: true,
      modalAdjustX: getRandomInteger(-MODAL_X_ADJUST,MODAL_X_ADJUST),
      modalAdjustY: getRandomInteger(-MODAL_Y_ADJUST,MODAL_Y_ADJUST)
    });
  }

  clearRatingsThanks() {
    SoundController.play(sound.close_fail);
    this.setState({ showExperienceThanksModal: false });
  }


  private updateWidgetState(widget : WidgetState) {
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

}

export const StoreLevelController = new _StoreLevelController();