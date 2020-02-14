export interface BuildingTenant {
    id: number;
    buildingId: number;
    characterId: number;
    tenantAdded: string;
    canEditBuilding: boolean;
    canWithdrawDeposit: boolean;
    canManagmentTenants: boolean;
    canManagmentMagazine: boolean;
    canRespawnInBuilding: boolean;
    canLockDoor: boolean;
    canManagmentGuests: boolean;
}
