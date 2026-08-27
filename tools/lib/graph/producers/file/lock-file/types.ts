import { z } from "zod"

export type LockFileAttrs = {
  readonly path: string
}

export type LockFileNodeType = "lock-file"

export const LOCK_FILE_NODE_TYPE: LockFileNodeType = "lock-file"

export const LockFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
