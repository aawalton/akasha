import { z } from "zod"

export type JsonlFileAttrs = {
  readonly path: string
}

export type JsonlFileNodeType = "jsonl-file"

export const JSONL_FILE_NODE_TYPE: JsonlFileNodeType = "jsonl-file"

export const JsonlFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
