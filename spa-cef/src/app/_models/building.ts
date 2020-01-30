import { Item } from './Item';

export interface Building {
    id: number;
    name: string;
    buildingType: number;
    entryFee: number;

    externalPickupPositionX: number;
    externalPickupPositionY: number;
    externalPickupPositionZ: number;

    internalPickupPositionX: number;
    internalPickupPositionY: number;
    internalPickupPositionZ: number;

    maxObjectsCount: number;
    currentObjectsCount: number;
    hasCCTV: boolean;
    hasSafe: boolean;
    spawnPossible: boolean;
    description?: string;
    createdTime: string;
    onSale: boolean;
    saleCost: number;
    characterId?: number;
    itemsInBuilding: Item[];
}
