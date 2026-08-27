import { z } from "zod"

export type TomlFileAttrs = {
  readonly path: string
}

export type TomlFileNodeType = "toml-file"

export const TOML_FILE_NODE_TYPE: TomlFileNodeType = "toml-file"

export const TomlFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
