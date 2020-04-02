import * as game from 'natives';


export class Controls {

    public static disableControls() {
        game.disableControlAction(0, 1, true);
        game.disableControlAction(0, 2, true);
        game.disableControlAction(0, 3, true);
        game.disableControlAction(0, 25, true);
        game.disableControlAction(0, 263, true);
        game.disableControlAction(0, 264, true);
        game.disableControlAction(0, 257, true);
        game.disableControlAction(0, 140, true);
        game.disableControlAction(0, 141, true);
        game.disableControlAction(0, 142, true);
        game.disableControlAction(0, 143, true);


        game.disableControlAction(0, 32, true);
        game.disableControlAction(0, 33, true);
        game.disableControlAction(0, 34, true);
        game.disableControlAction(0, 35, true);

        game.disableControlAction(0, 47, true);
        game.disableControlAction(0, 58, true);
    }
}
