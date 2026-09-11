import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
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

export const effectFormula = {
  id: "01a06196-0379-794b-ab04-2e9ba72de0d9",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "effect-formula",
  propertySlug: "formula",
  definition: "how an effect works out the number it has",
  properties: [
    { pageProperty: "text-property/formula-kind", required: false, many: false },
    { pageProperty: "text-property/metric-id", required: false, many: false },
    { pageProperty: "number-property/coefficient", required: false, many: false },
    { pageProperty: "text-property/coefficient-type", required: false, many: false },
    { pageProperty: "number-property/formula-percent", required: false, many: false },
  ],
} as const satisfies RecordProperty
