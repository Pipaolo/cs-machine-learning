import { z } from "zod";
import { validationErrors } from "~/utils/error";
// {
//     "pregnancies": 1,
//     "age" : 22,
//     "glucose": 148,
//     "blood_pressure": 72,
//     "bmi": 33.6,
//     "insulin": 0,
//     "diabetes_pedigree_function": 0.627,
//     "skin_thickness": 35
// }
export const DiabeticFormSchema = z.object({
  pregnancies: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(0, validationErrors.min(0)),
  glucose: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(0, validationErrors.min(0)),
  blood_pressure: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(0, validationErrors.min(0)),
  bmi: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(0, validationErrors.min(0)),
  insulin: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(0, validationErrors.min(0)),
  diabetes_pedigree_function: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(0, validationErrors.min(0)),
  skin_thickness: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(0, validationErrors.min(0)),
  age: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(1, validationErrors.min(0)),
});

export type DiabeticFormSchema = z.infer<typeof DiabeticFormSchema>;

export const DiabeticPredictionResponse = z.object({
  is_diabetic: z.boolean(),
});

export type DiabeticPredictionResponse = z.infer<
  typeof DiabeticPredictionResponse
>;
