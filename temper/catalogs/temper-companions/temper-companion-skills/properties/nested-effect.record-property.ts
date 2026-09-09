import type { RecordProperty } from "@akasha/pages/record-property"
import type { DamageType } from "../../../../characters/skill-activations/properties/damage-type.text-property.ts"
import type { Duration } from "./duration.number-property.ts"
import type { EffectConditions } from "./effect-conditions.record-property.ts"
import type { EffectFormula } from "./effect-formula.record-property.ts"
import type { EffectStatus } from "./effect-status.record-property.ts"
import type { EffectTarget } from "./effect-target.record-property.ts"
import type { SkillEffectType } from "./skill-effect-type.text-property.ts"

export type NestedEffect = {
  type?: SkillEffectType
  target?: EffectTarget
  formula?: EffectFormula
  status?: EffectStatus
  conditions?: readonly EffectConditions[]
  damageType?: DamageType
  duration?: Duration
  effect?: NestedEffect
}

export const nestedEffect = {
  id: "01a06196-037c-704b-a0d5-349064c3a709",
  pageTypeSlug: "record-property",
  slug: "nested-effect",
  propertySlug: "effect",
  definition: "the inner effect a delayed or repeating effect carries",
  properties: [
    { pageProperty: "text-property/skill-effect-type", required: false, many: false },
    { pageProperty: "record-property/effect-target", required: false, many: false },
    { pageProperty: "record-property/effect-formula", required: false, many: false },
    { pageProperty: "record-property/effect-status", required: false, many: false },
    {
      pageProperty: "record-property/effect-conditions",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/damage-type", required: false, many: false },
    { pageProperty: "number-property/duration", required: false, many: false },
    { pageProperty: "record-property/nested-effect", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An inner effect names the same kinds an outer effect names.",
    },
  ],
} as const satisfies RecordProperty
