import * as alt from 'alt';
import * as game from 'natives';

export default async () => {
    const blips: alt.PointBlip[] = [];



    alt.onServer('blip:create', createBlip);
    alt.onServer('blip:delete', deleteBlip);
    alt.onServer('blip:updateBlip', updateBlip);

    async function createBlip(posX: number, posY: number, posZ: number, sprite: number, color: number, scale: number, name: string, shortRange: boolean, uniqueID: any) {

        const blip = new alt.PointBlip(posX, posY, posZ);
        blip.sprite = sprite;
        blip.color = color;
        blip.scale = scale;
        blip.name = name;
        blip.shortRange = true;
        blips.push(blip);
        blip.setMeta('blip:uniqueID', uniqueID);
    }

    async function deleteBlip(uniqueID: any) {
        blips.forEach((item: alt.PointBlip) => {
            if (item.getMeta('blip:uniqueID') === uniqueID) {
                item.destroy();
            }
        });
    }

    async function updateBlip(uniqueID:any, sprite: number, name: string, color: number) {
        blips.forEach((blip: alt.PointBlip) => {
            // Coś znowu nie gra ze zmienianiem się po wylączeniu i wlączeniu sprzedaży
            if (blip.getMeta('blip:uniqueID') === uniqueID) {
                blip.sprite = sprite;
                blip.name = name;
                blip.color = color;
            }
        });
    }
};
