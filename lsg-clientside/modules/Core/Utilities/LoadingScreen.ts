import * as game from 'natives';

export enum Context {
    Other = 6,
    Gameload = 3,
    GameloadNews = 4,
    PcLanding = 5,
}

export class LoadingScreen {

    private handle: number;

    constructor() {
        this.handle = game.requestScaleformMovie('loadingscreen_startup');
    }

    public destroy() {
        game.setScaleformMovieAsNoLongerNeeded(this.handle);
    }
    public isLoaded() {
        return game.hasScaleformMovieLoaded(this.handle);
    }
    public setContext(context: Context) {
        game.beginScaleformMovieMethod(this.handle, 'SET_CONTEXT');
        game.scaleformMovieMethodAddParamInt(context);
        game.endScaleformMovieMethod();
    }

    public setProgressText(progressText: string) {
        game.beginScaleformMovieMethod(this.handle, 'SET_PROGRESS_TEXT');
        game.scaleformMovieMethodAddParamPlayerNameString(progressText);
        game.endScaleformMovieMethod();
    }

    public setProgressTitle(progressTitle: string) {
        game.beginScaleformMovieMethod(this.handle, 'SET_PROGRESS_TITLE');
        game.scaleformMovieMethodAddParamPlayerNameString(progressTitle);
        game.endScaleformMovieMethod();
    }

    public draw() {
        game.callScaleformMovieMethod(this.handle, 'STARTUP_ANIMATED_LOADINGSCREENS');
        game.drawScaleformMovieFullscreen(this.handle, 255, 255, 255, 255, 0);
    }
}

export enum SpinnerType {
    Clockwise1 = 1,
    Clockwise2,
    Clockwise3,
    SocialClubSaving,
    RegularClockwise,
}

export class Loading {
    public static get isActive() {
        return game.busyspinnerIsOn();
    }

    public static show(text: string, spinnerType: SpinnerType = SpinnerType.RegularClockwise) {
        Loading.hide();

        if (text == null) { return; }

        game.beginTextCommandBusyspinnerOn('STRING');
        game.addTextComponentSubstringPlayerName(text);
        game.endTextCommandBusyspinnerOn(spinnerType);
    }

    public static hide() {
        if (Loading.isActive) {
            game.busyspinnerOff();
        }
    }

}
