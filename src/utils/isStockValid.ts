export const minStock = 1;
export const maxStock = 999;

export const isStockValid = (stock: number) =>
  stock >= minStock && stock <= maxStock;
