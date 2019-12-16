export class Position {
    public static distance(positionOne: Vector3, positionTwo: Vector3) : number {
        return Math.sqrt(Math.pow(positionOne.x - positionTwo.x, 2) + Math.pow(positionOne.y  - positionTwo.y, 2) + Math.pow(positionOne.z - positionTwo.z, 2));
    }
}
