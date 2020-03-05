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

    static isPlayerInRange(senderPos: Vector3, getterPos: Vector3, range: number) {
       return (Calculation.distance(senderPos, getterPos) <= range);
    }

    public static getOffsetPositionInWorldCoords(entityHandle: number, offset: any): Vector3 {
        return game.getOffsetFromEntityInWorldCoords(entityHandle, offset.x, offset.y, offset.z);
    }

    public static getEntityRearPosition(entityHandle: number): Vector3 {
        const modelDimensions: any = game.getModelDimensions(game.getEntityModel(entityHandle), undefined, undefined);
        return this.getOffsetPositionInWorldCoords(entityHandle, new alt.Vector3(0, modelDimensions[1].y, 0));
    }







    public static rotationToDirection(rotation : any) {
        const z = Calculation.degToRad(rotation.z);
        const x = Calculation.degToRad(rotation.x);
        const num = Math.abs(Math.cos(x));

        const result: any = {};
        result.x = (-Math.sin(z) * num);
        result.y = (Math.cos(z) * num);
        result.z =  Math.sin(x);
        return result;
    }



    public static processCoordinates(x: number, y: number) {
        const res = game.getActiveScreenResolution(0, 0);
        const screenX = res[1];
        const screenY = res[2];

        let relativeX = (1 - ((x / screenX) * 1.0) * 2);
        let relativeY = (1 - ((y / screenY) * 1.0) * 2);

        if (relativeX > 0.0) {
            relativeX = -relativeX;
        } else {
            relativeX = Math.abs(relativeX);
        }

        if (relativeY > 0.0) {
            relativeY = -relativeY;
        } else {
            relativeY = Math.abs(relativeY);
        }

        return { x: relativeX, y: relativeY };
    }

    public static degToRad(deg: number) {
        return deg * Math.PI / 180.0;
    }

    public static mulNumber(vector1: Vector3, value: number) {
        const result: any = {};
        result.x = vector1.x * value;
        result.y = vector1.y * value;
        result.z = vector1.z * value;
        return result;
    }

    public static w2s(position: Vector3) {
        const result = game.getScreenCoordFromWorldCoord(position.x, position.y, position.z, undefined, undefined);

        if (!result[0]) {
            return undefined;
        }

        const newPos: any = {};
        newPos.x = (result[1] - 0.5) * 2;
        newPos.y = (result[2] - 0.5) * 2;
        newPos.z = 0;
        return newPos;
    }

    public static subVector3(vector1: Vector3, vector2: Vector3) {
        return {
            x: vector1.x - vector2.x,
            y: vector1.y - vector2.y,
            z: vector1.z - vector2.z,
        };
    }

    public static addVector3(vector1: Vector3, vector2: Vector3) {
        return {
            x: vector1.x + vector2.x,
            y: vector1.y + vector2.y,
            z: vector1.z + vector2.z,
        };
    }


    public static getMousePOSAbs() {
        const x = game.getControlNormal(0, 239);
        const y = game.getControlNormal(0, 240);
        const screenRes = game.getActiveScreenResolution(0, 0);
        const actualX = screenRes[1] * x;
        const actualY = screenRes[2] * y;
        return { x: actualX, y: actualY };
    }

    public static s2w(camPos: Vector3, relX: number, relY: number) {
        const camRot = game.getGameplayCamRot(0);
        const camForward = Calculation.rotationToDirection(camRot);
        const rotUp = Calculation.addVector3(camRot, { x: 10, y: 0, z: 0 });
        const rotDown = Calculation.addVector3(camRot, { x: -10, y: 0, z: 0 });
        const rotLeft = Calculation.addVector3(camRot, { x: 0, y: 0, z: -10 });
        const rotRight = Calculation.addVector3(camRot, { x: 0, y: 0, z: 10 });

        const camRight = Calculation.subVector3(Calculation.rotationToDirection(rotRight), Calculation.rotationToDirection(rotLeft));
        const camUp = Calculation.subVector3(Calculation.rotationToDirection(rotUp), Calculation.rotationToDirection(rotDown));

        const rollRad = -Calculation.degToRad(camRot.y);

        const camRightRoll = Calculation.subVector3(Calculation.mulNumber(camRight, Math.cos(rollRad)), Calculation. mulNumber(camUp, Math.sin(rollRad)));
        const camUpRoll = Calculation.addVector3(Calculation.mulNumber(camRight, Math.sin(rollRad)), Calculation.mulNumber(camUp, Math.cos(rollRad)));

        const point3D = Calculation.addVector3(
            Calculation.addVector3(
                Calculation.addVector3(camPos, Calculation.mulNumber(camForward, 10.0)),
                camRightRoll,
            ),
            camUpRoll);

        const point2D = Calculation.w2s(point3D);

        if (point2D === undefined) {
            return Calculation.addVector3(camPos, Calculation.mulNumber(camForward, 10.0));
        }

        const point3DZero = Calculation.addVector3(camPos, Calculation.mulNumber(camForward, 10.0));
        const point2DZero = Calculation.w2s(point3DZero);

        if (point2DZero === undefined) {
            return Calculation.addVector3(camPos, Calculation.mulNumber(camForward, 10.0));
        }

        const eps = 0.001;

        if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
            return Calculation.addVector3(camPos, Calculation.mulNumber(camForward, 10.0));
        }

        const scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
        const scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
        const point3Dret = Calculation.addVector3(
            Calculation.addVector3(
                Calculation.addVector3(camPos, Calculation.mulNumber(camForward, 10.0)),
                Calculation.mulNumber(camRightRoll, scaleX),
            ),
            Calculation.mulNumber(camUpRoll, scaleY));

        return point3Dret;
    }

    public static screen2dToWorld3dPosition(absoluteX: number, absoluteY: number, flags: number, ignore: any, callback: any) {
        const camPos = game.getGameplayCamCoord();
        const processedCoords = Calculation.processCoordinates(absoluteX, absoluteY);
        const target = Calculation.s2w(camPos, processedCoords.x, processedCoords.y);

        const dir = Calculation.subVector3(target, camPos);
        const from = Calculation.addVector3(camPos, Calculation.mulNumber(dir, 0.05));
        const to = Calculation.addVector3(camPos, Calculation.mulNumber(dir, 300));

        const ray = game.startShapeTestRay(from.x, from.y, from.z, to.x, to.y, to.z, flags, ignore, 0);
        const result = game.getShapeTestResult(ray, undefined, undefined, undefined, undefined);
        callback(result);
    }

}


