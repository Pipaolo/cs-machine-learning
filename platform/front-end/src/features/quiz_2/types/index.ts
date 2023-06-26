import { z } from "zod";
import { validationErrors } from "~/utils/error";
export const Quiz2Part1FormSchema = z.object({
  name: z
    .string({
      required_error: validationErrors.required,
    })
    .min(1, validationErrors.required),
  age: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(1, validationErrors.required),
  sex: z.string({
    required_error: validationErrors.required,
  }),
  height: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(1, "Height must be greater than 0")
    .max(500, "Height must be less than 600"),
  weight: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(1, "Weight must be greater than 0")
    .max(600, "Weight must be less than 600"),
  children: z.coerce.number({
    required_error: validationErrors.required,
  }),
});

export type Quiz2Part1FormSchema = z.infer<typeof Quiz2Part1FormSchema>;

export const Quiz2Part1Response = z.object({
  charges: z.number(),
  is_smoker: z.boolean(),
  non_smoker_probability: z.number(),
  smoker_probability: z.number(),
});

export type Quiz2Part1Response = z.infer<typeof Quiz2Part1Response>;

export const ChestPainType = z.enum([
  "TYPICAL_ANGINA",
  "ATYPICAL_ANGINA",
  "NON_ANGINAL_PAIN",
  "ASYMPTOMATIC",
]);

export type ChestPainType = z.infer<typeof ChestPainType>;

export const FastingBloodSugar = z.enum(["True", "False"]);
export type FastingBloodSugar = z.infer<typeof FastingBloodSugar>;

export const RestingElectrocardiographicResults = z.enum([
  "NORMAL",
  "STT_WAVE_ABNORMALITY",
  "LEFT_VENTRICULAR_HYPERTROPHY",
]);

export type RestingElectrocardiographicResults = z.infer<
  typeof RestingElectrocardiographicResults
>;

export const Quiz2Part2InitialFormSchema = z.object({
  age: z
    .number({
      required_error: validationErrors.required,
    })
    .min(1, validationErrors.required)
    .int(),
  sex: z.string().min(1, validationErrors.required),
  cp: z.number().min(1, validationErrors.required).int(),
  trestbps: z.number().min(1, validationErrors.required).int(),
  chol: z.number().min(1, validationErrors.required).int(),
  thalach: z.number().min(1, validationErrors.required).int(),
});

export type Quiz2Part2InitialFormValues = z.infer<
  typeof Quiz2Part2InitialFormSchema
>;

export const Quiz2Part2AdmittedFormSchema = Quiz2Part2InitialFormSchema.extend({
  fbs: z.number().min(1, validationErrors.required).int(),
  restecg: z.number().min(1, validationErrors.required).int(),
  thal: z.number().min(1, validationErrors.required).int(),
});

export type Quiz2Part2AdmittedFormValues = z.infer<
  typeof Quiz2Part2AdmittedFormSchema
>;
