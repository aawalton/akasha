import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { MaxTargets } from "./max-targets.number-property.ts"
import type { TargetKind } from "./target-kind.text-property.ts"
import type { TargetRadius } from "./target-radius.number-property.ts"
import type { TargetRange } from "./target-range.number-property.ts"
import type { TargetScope } from "./target-scope.text-property.ts"

export type EffectTarget = {
  type?: TargetKind
  scope?: TargetScope
  range?: TargetRange
  radius?: TargetRadius
  maxTargets?: MaxTargets
}

export const effectTarget = {
  id: "01a06196-0378-75a0-80bb-3aec137ffc83",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "effect-target",
  propertySlug: "target",
  definition: "who an effect lands on and how far it reaches",
  properties: [
    { pageProperty: "text-property/target-kind", required: false, many: false },
    { pageProperty: "text-property/target-scope", required: false, many: false },
    { pageProperty: "number-property/target-range", required: false, many: false },
    { pageProperty: "number-property/target-radius", required: false, many: false },
    { pageProperty: "number-property/max-targets", required: false, many: false },
  ],
} as const satisfies RecordProperty
