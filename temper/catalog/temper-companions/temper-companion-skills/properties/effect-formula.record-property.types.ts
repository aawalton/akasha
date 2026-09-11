import type { CoefficientType } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/coefficient-type.text-property.types.ts"
import type { FormulaKind } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/formula-kind.text-property.types.ts"
import type { FormulaPercent } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/formula-percent.number-property.types.ts"
import type { MetricId } from "akasha/temper/catalog/things/properties/metric-id.text-property.types.ts"
import type { Coefficient } from "akasha/temper/characters/skill-activations/properties/coefficient.number-property.types.ts"

export type EffectFormula = {
  type?: FormulaKind
  metricId?: MetricId
  coefficient?: Coefficient
  coefficientType?: CoefficientType
  percent?: FormulaPercent
}
