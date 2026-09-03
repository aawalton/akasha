import { z } from "zod"

export type SopsSecretFileAttrs = {
  readonly path: string
}

export type SopsSecretFileNodeType = "sops-secret-file"

export const SOPS_SECRET_FILE_NODE_TYPE: SopsSecretFileNodeType = "sops-secret-file"

export const SopsSecretFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
