export const isProductCategoryValid = (category: string) => {
  const validProductCategory = [
    "Digital Watches",
    "Classic Watches",
    "Smart Watches",
  ];
  return validProductCategory.includes(category);
};
