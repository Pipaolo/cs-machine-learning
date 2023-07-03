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
import {
  DiabeticFormSchema,
  DiabeticPredictionResponse,
} from "~/features/problem_set_4/types";

export const problemset4Router = createTRPCRouter({
  diabeticPrediction: publicProcedure
    .input(DiabeticFormSchema)
    .mutation(async ({ input }) => {
      const response = await axios.post("problemset-4/predict", input);

      const data = DiabeticPredictionResponse.parse(response.data);

      return data;
    }),
});
