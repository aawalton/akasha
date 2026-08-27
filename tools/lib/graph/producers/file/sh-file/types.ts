import { z } from "zod"

export type ShFileAttrs = {
  readonly path: string
}

export type ShFileNodeType = "sh-file"
export type ShSourcesFileEdgeType = "sh-sources-file"

export const SH_FILE_NODE_TYPE: ShFileNodeType = "sh-file"
export const SH_SOURCES_FILE_EDGE_TYPE: ShSourcesFileEdgeType = "sh-sources-file"

export type ShSourcesFileAttrs = {
  readonly specifier: string
}

export const ShFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
