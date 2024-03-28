export interface IPricingModel {
    id: number;
    organization_id: number | null;
    item_id: number | null;
    zone: string;
    base_distance_in_km: number;
    km_price: number;
    fix_price: number;
}
