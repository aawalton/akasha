import { z } from "zod"

export type TxtFileAttrs = {
  readonly path: string
}

export type TxtFileNodeType = "txt-file"

export const TXT_FILE_NODE_TYPE: TxtFileNodeType = "txt-file"

export const TxtFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
