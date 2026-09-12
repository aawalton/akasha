import { createDataFile } from "akasha/utils/narrow/modules/create-data-file/create-data-file.module.code.ts"

export interface ComparisonOpTemplate {
  id: string
  name: string
}

const TEMPER_COMPARISON_OPS = {
  "<=": { id: "<=", name: "≤" },
  "<": { id: "<", name: "<" },
  ">=": { id: ">=", name: "≥" },
  ">": { id: ">", name: ">" },
  "=": { id: "=", name: "=" },
  "!=": { id: "!=", name: "≠" },
} as const satisfies Record<string, ComparisonOpTemplate>

export const comparisonOps = createDataFile<ComparisonOpTemplate>()(TEMPER_COMPARISON_OPS)

export type ComparisonOpId = (typeof comparisonOps.ids)[number]
