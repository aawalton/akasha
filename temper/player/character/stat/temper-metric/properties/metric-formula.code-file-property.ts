import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const metricFormula = {
  id: "01a0de62-56d0-72e3-ba0e-68982a628b1d",
  type: "page-type/code-file-property",
  slug: "metric-formula",
  propertySlug: "formula",
  definition: "the formula a stat is worked out by",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "metric formula" },
    { partOfSpeech: "part-of-speech/noun", spelling: "metric formulas" },
  ],
  extensions: ["ts"],
  fixedExport: ["FORMULA"],
  types: "ts",
  createdAt: "2026-09-26T15:43:01.840Z",
  updatedAt: "2026-10-30T17:03:04.691Z",
} as const satisfies CodeFileProperty
