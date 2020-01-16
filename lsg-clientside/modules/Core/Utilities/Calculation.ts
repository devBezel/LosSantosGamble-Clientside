import * as alt from 'alt';

export function distance(distOne: Vector3, distTwo: Vector3) {

    const dist = Math.pow(distOne.x - distTwo.x, 2) + Math.pow(distOne.y - distTwo.y, 2) + Math.pow(distOne.z - distTwo.z, 2);

    return dist;
}


