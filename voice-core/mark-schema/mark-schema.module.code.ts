import { z } from "zod"

export const sentenceMarkSchema = z
  .object({
    sentenceIndex: z.number().int().nonnegative(),
    startSec: z.number().nonnegative(),
  })
  .strict()

export type SentenceMark = z.infer<typeof sentenceMarkSchema>
