export type ImportStylesheetEdgeType = "import-stylesheet"

export const IMPORT_STYLESHEET_EDGE_TYPE: ImportStylesheetEdgeType = "import-stylesheet"

export type ImportStylesheetAttrs = {
  readonly specifier: string
  readonly resolved: string
}
