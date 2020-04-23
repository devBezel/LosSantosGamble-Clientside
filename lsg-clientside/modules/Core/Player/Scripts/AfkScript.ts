import * as alt from 'alt';
import * as game from 'natives';
import { View } from '../../Utilities/View';


// export default async () => {

//     const player = alt.Player.local;
//     let isAfk = false;
//     let oldMousePosition: any;
//     let webView: View;
//     let webViewOpen: boolean = false;

//     alt.setInterval(() => {
//         const mousePosition = alt.getCursorPos();

//         if (mousePosition.x === oldMousePosition.x && mousePosition.y === oldMousePosition.y) {
//             alt.log('playerafk');
//             runAfkStatus();
//         }
//     },              20000);

//     alt.setInterval(() => {
//         alt.log('sprawdzam pozycje myszki');
//         oldMousePosition = alt.getCursorPos();
//     },              10000);

//     alt.on('keyup', (key: any) => {
//         if (!isAfk) return;

//        disposeAfkStatus();
//     });

//     alt.setInterval(() => {
//         if (!isAfk) return;


//         if (alt.getCursorPos().x !== oldMousePosition.x && alt.getCursorPos().y !== oldMousePosition.y) {
//             disposeAfkStatus();
//         }
//     },              1000);

//     async function runAfkStatus() {
//         if (!webView) {
//             webView = new View();
//         }

//         webView.open('', false, 'afk', true);
//         webViewOpen = true;

//         isAfk = true;
//         alt.emitServer('player:afk', true);
//     }

//     async function disposeAfkStatus() {
//         if (webViewOpen) {
//             webView.close();
//             webViewOpen = false;
//         }
//         isAfk = false;
//         alt.emitServer('player:afk', false);
//     }
// };


export default async () => {

    let webView: View;
    let isAfk: boolean;
    let prevPos: any;
    const player = alt.Player.local;
    const secondsUntilAFK = 180;
    let time: number;



    // TODO: Naprawić system afk
    alt.setInterval(() => {
        const currentPos = game.getEntityCoords(player.scriptID, true);

        if ((currentPos !== undefined && prevPos !== undefined) && (currentPos.x === prevPos.x && currentPos.y === prevPos.y) && player.isReady()) {
            if (time > 0) {
                time -= 2;
            } else {
                if (!isAfk) {
                    turnAFKStatus();
                }
            }
        } else {
            if (isAfk) {
                disposeAFKStatus();
            }

            time = secondsUntilAFK;
        }

    },              2000);

    alt.setInterval(() => {
        prevPos = game.getEntityCoords(player.scriptID, true);
    },              1000);

    function turnAFKStatus() {
        isAfk = true;
        alt.emitServer('player:afk', true);

        if (!webView) {
            webView = new View();
        }

        webView.open('', false, 'afk', true, false);
    }

    function disposeAFKStatus() {
        isAfk = false;
        alt.emitServer('player:afk', false);

        webView.close();
    }

};

