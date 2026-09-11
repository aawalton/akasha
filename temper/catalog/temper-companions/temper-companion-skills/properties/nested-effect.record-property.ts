import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { Duration } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/duration.number-property.types.ts"
import type { EffectConditions } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/effect-conditions.record-property.ts"
import type { EffectFormula } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/effect-formula.record-property.ts"
import type { EffectStatus } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/effect-status.record-property.ts"
import type { EffectTarget } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/effect-target.record-property.ts"
import type { SkillEffectType } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/skill-effect-type.text-property.types.ts"
import type { DamageType } from "akasha/temper/characters/skill-activations/properties/damage-type.text-property.types.ts"

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
  type: "record-property",
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
