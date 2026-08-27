import { z } from "zod"

export type DockerfileImageLine = {
  readonly value: string
  readonly line: number
}

export type DockerfileFileAttrs = {
  readonly path: string
  readonly imageLines: readonly DockerfileImageLine[]
}

export type DockerfileFileNodeType = "dockerfile-file"

export const DOCKERFILE_FILE_NODE_TYPE: DockerfileFileNodeType = "dockerfile-file"

export type DockerfileCompilesEntryAttrs = Record<string, never>

export type DockerfileCompilesEntryEdgeType = "dockerfile-compiles-entry"

export const DOCKERFILE_COMPILES_ENTRY_EDGE_TYPE: DockerfileCompilesEntryEdgeType =
  "dockerfile-compiles-entry"

export const DockerfileImageLineSchema = z
  .object({ value: z.string(), line: z.number().int().positive() })
  .passthrough()

export const DockerfileFileAttrsSchema = z
  .object({
    path: z.string(),
    imageLines: z.array(DockerfileImageLineSchema),
  })
  .passthrough()
