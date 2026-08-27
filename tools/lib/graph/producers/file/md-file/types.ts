import { z } from "zod"

export type MdImportKind = "static" | "dynamic" | "require"

export type MdImportDisposition = "edge" | "external" | "excluded" | "template"

export type MdImportEntry = {
  readonly specifier: string
  readonly line: number
  readonly kind: MdImportKind
  readonly disposition: MdImportDisposition
}

export type MdFileAttrs = {
  readonly path: string
  readonly imports: readonly MdImportEntry[]
}

export type MdImportsAttrs = {
  readonly specifier: string
  readonly resolved: string | null
  readonly line: number
}

export type MdLinkAttrs = {
  readonly line: number
  readonly rawHref: string
  readonly fragment: string | null
  readonly resolvedRel: string
}

export type MdFileNodeType = "md-file"
export type FileNodeType = "file"
export type MdImportsEdgeType = "md-imports"
export type MdLinkEdgeType = "md-link"

export const MD_FILE_NODE_TYPE: MdFileNodeType = "md-file"
export const FILE_NODE_TYPE: FileNodeType = "file"
export const MD_IMPORTS_EDGE_TYPE: MdImportsEdgeType = "md-imports"
export const MD_LINK_EDGE_TYPE: MdLinkEdgeType = "md-link"

const MdImportKindSchema = z.enum(["static", "dynamic", "require"])
const MdImportDispositionSchema = z.enum(["edge", "external", "excluded", "template"])

export const MdImportEntrySchema = z
  .object({
    specifier: z.string(),
    line: z.number().int().positive(),
    kind: MdImportKindSchema,
    disposition: MdImportDispositionSchema,
  })
  .passthrough()

export const MdFileAttrsSchema = z
  .object({
    path: z.string(),
    imports: z.array(MdImportEntrySchema),
  })
  .passthrough()

export const MdImportsAttrsSchema = z
  .object({
    specifier: z.string(),
    resolved: z.string().nullable(),
    line: z.number(),
  })
  .passthrough()

export const MdLinkAttrsSchema = z
  .object({
    line: z.number().int().positive(),
    rawHref: z.string(),
    fragment: z.string().nullable(),
    resolvedRel: z.string(),
  })
  .passthrough()
