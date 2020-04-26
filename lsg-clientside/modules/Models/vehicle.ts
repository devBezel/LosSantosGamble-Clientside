export interface Vehicle {
    id: number;
    model: string;
    ownerId: number;
    groupId: number;
    posX: number;
    posY: number;
    posZ: number;
    rotRoll: number;
    rotPitch: number;
    rotYaw: number;
    r: number;
    g: number;
    b: number;
    state: boolean;
    health: number;
    // dimension: number;
}
