import type { CoefficientType } from "akasha/temper/catalog/temper-companions/temper-companion-skill/properties/coefficient-type.text-property.types.ts"
import type { FormulaKind } from "akasha/temper/catalog/temper-companions/temper-companion-skill/properties/formula-kind.text-property.types.ts"
import type { FormulaPercent } from "akasha/temper/catalog/temper-companions/temper-companion-skill/properties/formula-percent.number-property.types.ts"
import type { MetricId } from "akasha/temper/catalog/temper-companions/temper-companion-trait/properties/metric-id.text-property.types.ts"
import type { Coefficient } from "akasha/temper/character/skill-activation/properties/coefficient.number-property.types.ts"

export type EffectFormula = {
  type?: FormulaKind
  metricId?: MetricId
  coefficient?: Coefficient
  coefficientType?: CoefficientType
  percent?: FormulaPercent
}
