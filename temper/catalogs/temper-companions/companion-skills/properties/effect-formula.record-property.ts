import type { RecordProperty } from "@akasha/pages/record-property"
import type { MetricId } from "../../../../temper-catalog/temper-catalog-things/properties/metric-id.text-property.ts"
import type { Coefficient } from "../../../../temper-character/character-skill-activations/properties/coefficient.number-property.ts"
import type { CoefficientType } from "./coefficient-type.text-property.ts"
import type { FormulaKind } from "./formula-kind.text-property.ts"
import type { FormulaPercent } from "./formula-percent.number-property.ts"

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
