import { z } from "zod"

export type CsvFileAttrs = {
  readonly path: string
}

export type CsvFileNodeType = "csv-file"

export const CSV_FILE_NODE_TYPE: CsvFileNodeType = "csv-file"

export const CsvFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
