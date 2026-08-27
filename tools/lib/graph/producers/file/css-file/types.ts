import { z } from "zod"
import { nodeId } from "../../lib/node-id.ts"

export type CssDirective = {
  readonly raw: string
  readonly pattern: string
  readonly line: number
  readonly negated: boolean
  readonly resolvedBase: string | null
}

export type CssFileAttrs = {
  readonly path: string
  readonly directives: readonly CssDirective[]
  readonly package: string | null
  readonly packageRefs: readonly string[]
}

export type CssImportsAttrs = {
  readonly specifier: string
  readonly resolved: string | null
  readonly line: number
}

export type CssSourceAttrs = {
  readonly raw: string
  readonly pattern: string
  readonly line: number
  readonly negated: boolean
  readonly resolvedBase: string
}

export type CssFileNodeType = "css-file"
export type CssImportsEdgeType = "css-imports"
export type CssSourceEdgeType = "css-source"

export const CSS_FILE_NODE_TYPE: CssFileNodeType = "css-file"
export const CSS_IMPORTS_EDGE_TYPE: CssImportsEdgeType = "css-imports"
export const CSS_SOURCE_EDGE_TYPE: CssSourceEdgeType = "css-source"

export const cssFileNodeId = (relPath: string): string => nodeId(CSS_FILE_NODE_TYPE, relPath)

const CssDirectiveSchema = z
  .object({
    raw: z.string(),
    pattern: z.string(),
    line: z.number(),
    negated: z.boolean(),
    resolvedBase: z.string().nullable(),
  })
  .passthrough()

export const CssFileAttrsSchema = z
  .object({
    path: z.string(),
    directives: z.array(CssDirectiveSchema),
    package: z.string().nullable(),
    packageRefs: z.array(z.string()),
  })
  .passthrough()

export const CssImportsAttrsSchema = z
  .object({
    specifier: z.string(),
    resolved: z.string().nullable(),
    line: z.number(),
  })
  .passthrough()

export const CssSourceAttrsSchema = z
  .object({
    raw: z.string(),
    pattern: z.string(),
    line: z.number(),
    negated: z.boolean(),
    resolvedBase: z.string(),
  })
  .passthrough()
