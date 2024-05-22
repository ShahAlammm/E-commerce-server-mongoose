export type ProductVariant = {
  type: string;
  value: string;
};

export type ProductInventory = {
  quantity: number;
  inStock: boolean;
};

export type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: ProductVariant[];
  inventory: ProductInventory;
};
