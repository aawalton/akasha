import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const metricFormula = {
  id: "01a0de62-56d0-72e3-ba0e-68982a628b1d",
  type: "page-type/code-file-property",
  slug: "metric-formula",
  propertySlug: "formula",
  definition: "the formula a stat is worked out by",
  extensions: ["ts"],
  fixedExport: ["FORMULA"],
  types: "ts",
} as const satisfies CodeFileProperty
