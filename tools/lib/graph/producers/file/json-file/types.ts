import { z } from "zod"

export type JsonFileAttrs = {
  readonly path: string
}

export type JsonFileNodeType = "json-file"

export const JSON_FILE_NODE_TYPE: JsonFileNodeType = "json-file"

export const JsonFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
