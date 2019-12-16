import * as alt from 'alt';
import * as game from 'natives';

export class Draw {
    public static drawText(msg: string, x: number, y: number, scale: number, fontType: any, r: number, g: number, b: number, a: number, useOutline: boolean = true, useDropShadow: boolean = true) {
        {
            game.beginTextCommandDisplayText('STRING');
            game.addTextComponentSubstringPlayerName(msg);
            game.setTextFont(fontType);
            game.setTextScale(1, scale);
            game.setTextWrap(0.0, 0.1);
            game.setTextCentre(true);
            game.setTextColour(r, g, b, a);

            if (useOutline) {
                game.setTextOutline();
            }

            if (useDropShadow) {
                game.setTextDropShadow();
            }

            game.endTextCommandDisplayText(x, y);
       }
    }

}
