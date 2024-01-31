export const isFormFieldEmpty = (field: string) => field === "";

export const isAllFieldFilled = (fields: string[]) => {
  for (const field of fields) {
    if (isFormFieldEmpty(field)) {
      return false;
    }
  }
  return true;
};
