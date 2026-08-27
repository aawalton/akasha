import { z } from "zod"

export type ConfFileAttrs = {
  readonly path: string
}

export type ConfFileNodeType = "conf-file"

export const CONF_FILE_NODE_TYPE: ConfFileNodeType = "conf-file"

export const ConfFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
