import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_COMPARISON_OPS } from "../generated/temper-comparison-op.generated"

export interface ComparisonOpTemplate {
  id: string
  name: string
}

export const comparisonOps = createDataFile<ComparisonOpTemplate>()(TEMPER_COMPARISON_OPS)

export type ComparisonOpId = (typeof comparisonOps.ids)[number]
