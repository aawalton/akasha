import { posix } from "node:path"
import { z } from "zod"

export type TsconfigFileAttrs = {
  readonly path: string
}

export type TsconfigFileNodeType = "tsconfig-file"

export const TSCONFIG_FILE_NODE_TYPE: TsconfigFileNodeType = "tsconfig-file"

export const isTsconfigPath = (relPath: string): boolean => {
  const base = posix.basename(relPath)
  return base.startsWith("tsconfig") && base.endsWith(".json")
}

export const TsconfigFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()

export type TsconfigIncludesFileEdgeType = "tsconfig-includes-file"

export const TSCONFIG_INCLUDES_FILE_EDGE_TYPE: TsconfigIncludesFileEdgeType =
  "tsconfig-includes-file"

export type TsconfigIncludesFileAttrs = {
  readonly path: string
}
