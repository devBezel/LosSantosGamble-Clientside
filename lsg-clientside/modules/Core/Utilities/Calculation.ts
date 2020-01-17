import * as alt from 'alt';

export class Calculation {
    static distance(distOne: Vector3, distTwo: Vector3) {

        const dist = Math.pow(distOne.x - distTwo.x, 2) + Math.pow(distOne.y - distTwo.y, 2) + Math.pow(distOne.z - distTwo.z, 2);

        return dist;
    }


    static probability(percent: number) {
        const randNumber = Math.floor(Math.random() * 100) + 1;

        alt.log(`Wylosowana liczba: ${randNumber}`);
        if (randNumber > 0 && randNumber <= percent) {
            return true;
        }
        return false;
    }
}


