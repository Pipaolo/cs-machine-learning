export const validationErrors = {
  required: "This field is required.",
  min: (min: number) => `Must be greater than ${min}.`,
  max: (max: number) => `Must be less than ${max}.`,
};
