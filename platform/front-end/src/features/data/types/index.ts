import { z } from "zod";

export const MinMaxData = z.object({
  max: z.record(z.any()),
  min: z.record(z.any()),
});

export type MinMaxData = z.infer<typeof MinMaxData>;
