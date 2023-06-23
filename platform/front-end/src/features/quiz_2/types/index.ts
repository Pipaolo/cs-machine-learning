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

export const HAttackInitialFormSchema = z.object({
  age: z.coerce
    .number({
      required_error: validationErrors.required,
    })
    .min(1, validationErrors.min(0)),
  sex: z.string().min(1, validationErrors.required),
  cp: z
    .string({
      required_error: validationErrors.required,
    })
    .min(1, validationErrors.required),
  trestbps: z.coerce.number().min(0, validationErrors.min(0)),
  chol: z.coerce.number().min(0, validationErrors.min(0)),
  thalach: z.coerce.number().min(0, validationErrors.min(0)),
});

export type HAttackInitialFormSchema = z.infer<typeof HAttackInitialFormSchema>;

export const HAttackAdmittedFormSchema = z.object({
  fbs: z
    .string({
      required_error: validationErrors.required,
    })
    .min(0, validationErrors.required),
  restecg: z
    .string({
      required_error: validationErrors.required,
    })
    .min(0, validationErrors.required),
  thal: z.coerce.number().min(0, validationErrors.min(1)),
});

export type HAttackAdmittedFormSchema = z.infer<
  typeof HAttackAdmittedFormSchema
>;

export const HAttackPredictionResponse = z.object({
  probabilities: z.object({
    heart_attack: z.number(),
    no_heart_attack: z.number(),
  }),
});

export type HAttackPredictionResponse = z.infer<
  typeof HAttackPredictionResponse
>;
