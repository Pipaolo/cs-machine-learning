import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "~/utils/axios";
import { MinMaxData } from "~/features/data";

export const dataRouter = createTRPCRouter({
  minMax: publicProcedure
    .input(
      z.object({
        fileName: z.string(),
      })
    )
    .query(async ({ input }) => {
      const response = await axios.post("min_max", {
        file_name: input.fileName,
      });

      const data = MinMaxData.parse(response.data);

      return data;
    }),
});
