import { z } from "zod"

export type SopsConfigFileAttrs = {
  readonly path: string
}

export type SopsConfigFileNodeType = "sops-config-file"

export const SOPS_CONFIG_FILE_NODE_TYPE: SopsConfigFileNodeType = "sops-config-file"

export const SOPS_CONFIG_BASENAME = ".sops.yaml"

export const SopsConfigFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
