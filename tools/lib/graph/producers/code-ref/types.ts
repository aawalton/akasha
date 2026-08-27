export type ImportCodeRefEdgeType = "import-code-ref"
export const IMPORT_CODE_REF_EDGE_TYPE: ImportCodeRefEdgeType = "import-code-ref"

export type ImportCodeRefAttrs = {
  readonly specifier: string
  readonly resolved: string | null
}
