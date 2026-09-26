import type { EsoStatConstantName } from "akasha/temper/player/character/stat/temper-metric/properties/eso-stat-constant-name.text-property.types.ts"
import type { EsoStatValuePart } from "akasha/temper/player/character/stat/temper-metric/properties/eso-stat-value-part.text-property.types.ts"
import type { FullyImplemented } from "akasha/temper/player/character/stat/temper-metric/properties/fully-implemented.boolean-property.types.ts"
import type { MetricCap } from "akasha/temper/player/character/stat/temper-metric/properties/metric-cap.number-property.types.ts"
import type { MetricDivisor } from "akasha/temper/player/character/stat/temper-metric/properties/metric-divisor.number-property.types.ts"
import type { MetricFormula } from "akasha/temper/player/character/stat/temper-metric/properties/metric-formula.code-file-property.types.ts"
import type { MetricPolarity } from "akasha/temper/player/character/stat/temper-metric/properties/metric-polarity.text-property.types.ts"
import type { MetricValueType } from "akasha/temper/player/character/stat/temper-metric/properties/metric-value-type.text-property.types.ts"
import type { Category } from "akasha/temper/thing/properties/category.text-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperMetric = TemperThing & {
  category?: Category
  valueType: MetricValueType
  polarity: MetricPolarity
  esoStatConstantName?: EsoStatConstantName
  esoStatValuePart?: EsoStatValuePart
  divisor?: MetricDivisor
  cap?: MetricCap
  fullyImplemented: FullyImplemented
  formula?: MetricFormula
}
