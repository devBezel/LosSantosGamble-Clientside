import * as alt from 'alt';
import * as game from 'natives';
import { Marker } from 'client/modules/Models/marker';

export default async () => {

    const markers: Marker[] = [];


    alt.onServer('marker:create', createMarker);
    alt.onServer('marker:remove', markerRemove);


    async function createMarker(marker: Marker) {
        // if (markers.filter(x => x.uniqueID === marker.uniqueID)) return;
        markers.push(marker);
    }

    async function markerRemove(uniqueID: string) {

        const markerToRemove = markers.findIndex(marker => marker.uniqueID === uniqueID);
        alt.log(`usuwam marker ${markerToRemove}`);
        markers.splice(markerToRemove, 1);
    }

    async function drawMarker(marker: Marker) {
        game.drawRect(0, 0, 0, 0, 0, 0, 0, 0, true);
        game.drawMarker(marker.type, marker.posX, marker.posY, marker.posZ, marker.dirX, marker.dirY,
                        marker.dirZ, marker.rotX, marker.rotY, marker.rotZ, marker.scaleX, marker.scaleY,
                        marker.scaleZ, marker.red, marker.green, marker.blue, marker.alpha, marker.bobUpAndDown,
                        marker.faceCamera, marker.p19, marker.rotate, marker.textureDict, marker.textureName, marker.drawOnEnts);
    }

    alt.setInterval(() => {
        const playerDimension = alt.Player.local.getSyncedMeta('player:dimension');
        for (let i = 0; i < markers.length; i++) {
            if (playerDimension === markers[i].dimension) {
                drawMarker(markers[i]);
            }
            // drawMarker(markers.find(x => x.dimension === playerDimension));
        }
    },              10);
};
