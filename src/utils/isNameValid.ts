export const isNameValid = (name: string) => {
  return name.match(/([^ a-zA-Z])/g) === null;
};
