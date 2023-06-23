import { Quiz2Part1FormSchema, Quiz2Part1Response } from "~/features/quiz_2";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "~/utils/axios";

export const quiz2Router = createTRPCRouter({
  part1Prediction: publicProcedure
    .input(Quiz2Part1FormSchema.partial())
    .mutation(async ({ input }) => {
      const { name: _, ...restInput } = input;
      const response = await axios.post("quiz-2/part-1/predict", restInput);

      const data = Quiz2Part1Response.parse(response.data);

      return data;
    }),
});
