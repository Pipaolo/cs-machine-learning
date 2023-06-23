import {
  Quiz2Part1FormSchema,
  Quiz2Part1Response,
  HAttackInitialFormSchema,
  HAttackAdmittedFormSchema,
  HAttackPredictionResponse,
} from "~/features/quiz_2";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "~/utils/axios";
import { z } from "zod";
import { validationErrors } from "~/utils/error";

export const quiz2Router = createTRPCRouter({
  insuranceCostPrediction: publicProcedure
    .input(Quiz2Part1FormSchema.partial())
    .mutation(async ({ input }) => {
      const { name: _, ...restInput } = input;
      const response = await axios.post("quiz-2/part-1/predict", restInput);

      const data = Quiz2Part1Response.parse(response.data);

      return data;
    }),
  hAttackInitialPrediction: publicProcedure
    .input(HAttackInitialFormSchema)
    .mutation(async ({ input }) => {
      const response = await axios.post("quiz-2/part-2/predict/initial", {
        ...input,
        cp: Number(input.cp),
      });

      return HAttackPredictionResponse.parse(response.data);
    }),
  hAttackAdmittedPrediction: publicProcedure
    .input(
      HAttackInitialFormSchema.extend({
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
      })
    )
    .mutation(async ({ input }) => {
      const response = await axios.post("quiz-2/part-2/predict/admitted", {
        ...input,
        cp: Number(input.cp),
        fbs: Number(input.fbs),
        restecg: Number(input.restecg),
      });

      return HAttackPredictionResponse.parse(response.data);
    }),
});
