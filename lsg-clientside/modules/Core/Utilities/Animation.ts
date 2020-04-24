import * as alt from 'alt';
import * as game from 'natives';


export class Animation {


    private animDict: string;
    private animation: string;
    private timeAnim: number;
    private animFlag: number;

    constructor(animDic: string, animation: string, time: number, animFlag: number = 1) {
        this.animDict = animDic;
        this.animation = animation;
        this.timeAnim = time;
        this.animFlag = animFlag;
    }


    loadAnimDictAsync() {
        return new Promise((resolve: any, reject: any) => {
            if (!game.doesAnimDictExist(this.animDict)) {
                alt.log('dict nie istnieje');
                return resolve(false);
            }

            if (game.hasAnimDictLoaded(this.animDict)) {
                alt.log('dict jest juz zaladowany');
                return resolve(true);
            }

            game.requestAnimDict(this.animDict);

            const interval = alt.setInterval(() => {
                if (game.hasAnimDictLoaded(this.animDict)) {
                    alt.log('zaladowano');
                    alt.clearInterval(interval);
                    return resolve(true);
                }
            },                               0);
        });
    }

    playAnim() {

        if (game.hasAnimDictLoaded(this.animDict)) {
            game.taskPlayAnim(alt.Player.local.scriptID, this.animDict, this.animation, 8.0, 1.0, -1, this.animFlag, 1, false, false, false);

            alt.log('probuje wykonac animacje');
            if (this.timeAnim !== -1) {
                alt.setTimeout(() => {
                    game.clearPedTasks(alt.Player.local.scriptID);
                    game.stopAnimTask(alt.Player.local.scriptID, this.animDict, this.animation, 0);
                },             this.timeAnim);
            }
        }

    }
}
