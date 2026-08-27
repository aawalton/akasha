import { z } from "zod"

export type IgnoreFileAttrs = {
  readonly path: string
}

export type IgnoreFileNodeType = "ignore-file"

export const IGNORE_FILE_NODE_TYPE: IgnoreFileNodeType = "ignore-file"

export const IgnoreFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
