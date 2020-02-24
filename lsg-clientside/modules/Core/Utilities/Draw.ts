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

    public static drawTextConstant(x: number, y:number, width: number, height: number, scale:number, text:string, r:number, g:number, b:number, a:number, outline: boolean = true) {
        game.beginTextCommandDisplayText('STRING');
        game.addTextComponentSubstringPlayerName(text);
        game.setTextFont(4);
        game.setTextScale(1, scale);
        game.setTextWrap(0.0, 0.1);
        game.setTextCentre(true);
        game.setTextColour(r, g, b, a);

        if (outline) {
            game.setTextOutline();
        }


        // if (useOutline) {
        //     game.setTextOutline();
        // }

        // if (useDropShadow) {
        //     game.setTextDropShadow();
        // }
        game.endTextCommandDisplayText(x - width / 2, y - height / 2 + 0.005);
    }


    public static draw3dText(x: number, y: number, z: number, name: string) : void {
        // tslint:disable-next-line:variable-name
        const [bol, _x, _y] = game.getScreenCoordFromWorldCoord(x, y, z, x, y);
        const camCord = game.getFinalRenderedCamCoord();
        const dist = game.getDistanceBetweenCoords(camCord.x, camCord.y, camCord.z, x, y, z, true);


        if (dist > 20) return;

        let scale = (4.00001 / dist) * 0.3;
        if (scale > 0.2) {
            scale = 0.2;
        }


        const fov = (1 / game.getGameplayCamFov()) * 100;
        scale = scale * fov;

        if (bol) {
            game.setTextScale(scale, scale);
            game.setTextFont(0);
            game.setTextProportional(true);
            game.setTextColour(255, 255, 255, 255);
            game.setTextDropshadow(0, 0, 0, 0, 255);
            game.setTextEdge(2, 0, 0, 0, 150);
            game.setTextDropShadow();
            game.setTextOutline();
            game.setTextCentre(true);
            game.beginTextCommandDisplayText('STRING');
            game.addTextComponentSubstringPlayerName(name);
            game.endTextCommandDisplayText(_x, _y + 0.025);
        }
    }

}
