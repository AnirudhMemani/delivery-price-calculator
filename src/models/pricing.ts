export interface IPricingModel {
    id: number;
    organizationId: number;
    itemId: number;
    zone: string;
    baseDistanceInKm: number;
    kmPrice: number;
    fixPrice: number;
}
