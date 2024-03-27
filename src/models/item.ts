export interface Item {
    id: number;
    type: "perishable" | "non-perishable";
    description?: string;
}
