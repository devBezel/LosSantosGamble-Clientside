import * as alt from 'alt';
import * as game from 'natives';


export class Calculation {
    static distance(distOne: Vector3, distTwo: Vector3) {

        const dist = Math.pow(distOne.x - distTwo.x, 2) + Math.pow(distOne.y - distTwo.y, 2) + Math.pow(distOne.z - distTwo.z, 2);

        return dist;
    }

    static forwardVectorFromRotation(rotation: Vector3) {
        const z = rotation.z * (Math.PI / 180.0);
        const x = rotation.x * (Math.PI / 180.0);
        const num = Math.abs(Math.cos(x));
        return new alt.Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
    }

    static positionInFront(position: Vector3, rotation: Vector3, distance: number) {
        const forwardVector: any = Calculation.forwardVectorFromRotation(rotation);
        const scaledForwardVector: any = new alt.Vector3(forwardVector.x * distance, forwardVector.y * distance, forwardVector.z * distance);
        return new alt.Vector3(position.x + scaledForwardVector.x, position.y + scaledForwardVector.y, position.z + scaledForwardVector.z);
    }


    static probability(percent: number) {
        const randNumber = Math.floor(Math.random() * 100) + 1;

        alt.log(`Wylosowana liczba: ${randNumber}`);
        if (randNumber > 0 && randNumber <= percent) {
            return true;
        }
        return false;
    }


    static getVehicleInRange(pos: Vector3, range: number): alt.Vehicle {
        const vehicles = alt.Vehicle.all.find(x => this.positionInFront(alt.Player.local.pos, game.getEntityRotation(alt.Player.local.scriptID, 2), range) <= pos);

        return vehicles;
    }

    public static getOffsetPositionInWorldCoords(entityHandle: number, offset: any): Vector3 {
        return game.getOffsetFromEntityInWorldCoords(entityHandle, offset.x, offset.y, offset.z);
    }

    public static getEntityRearPosition(entityHandle: number): Vector3 {
        const modelDimensions: any = game.getModelDimensions(game.getEntityModel(entityHandle), undefined, undefined);
        return this.getOffsetPositionInWorldCoords(entityHandle, new alt.Vector3(0, modelDimensions[1].y, 0));
    }

}


