import { z } from "zod"

export type EnvFileAttrs = {
  readonly path: string
}

export type EnvFileNodeType = "env-file"

export const ENV_FILE_NODE_TYPE: EnvFileNodeType = "env-file"

export const EnvFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
