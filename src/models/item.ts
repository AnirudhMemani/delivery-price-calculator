export interface IItemModel {
    id: number;
    type: "perishable" | "non-perishable";
    description?: string;
}
