import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"
import type { MetricTemplate } from "akasha/temper/player/character/stat/modules/metric-template/metric-template.module.code.ts"

const STATED_WHEN_THERE = [
  "category",
  "esoStatConstantName",
  "esoStatValuePart",
  "divisor",
  "cap",
] as const

function templateOf(value: Value, formulas: ReadonlyMap<string, FormulaNode>): MetricTemplate {
  const id = String(value.slug) as MetricId
  const stated: Record<string, unknown> = {}
  for (const key of STATED_WHEN_THERE) {
    const one = value[key]
    if (one !== undefined && one !== null) stated[key] = one
  }
  const formula = formulas.get(id)
  return {
    id,
    name: String(value.title),
    valueType: value.valueType as MetricTemplate["valueType"],
    polarity: value.polarity as MetricTemplate["polarity"],
    fullyImplemented: value.fullyImplemented === true,
    ...stated,
    ...(formula === undefined ? {} : { formula }),
  } as MetricTemplate
}

function bySlug(one: Value, other: Value): number {
  return String(one.slug) < String(other.slug) ? -1 : 1
}

export function metricTemplatesOf(
  pages: Iterable<Value>,
  formulas: ReadonlyMap<string, FormulaNode>
): readonly MetricTemplate[] {
  return [...pages].sort(bySlug).map((value) => templateOf(value, formulas))
}
