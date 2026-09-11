import type { MaxTargets } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/max-targets.number-property.types.ts"
import type { TargetKind } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/target-kind.text-property.types.ts"
import type { TargetRadius } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/target-radius.number-property.types.ts"
import type { TargetRange } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/target-range.number-property.types.ts"
import type { TargetScope } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/target-scope.text-property.types.ts"

export type EffectTarget = {
  type?: TargetKind
  scope?: TargetScope
  range?: TargetRange
  radius?: TargetRadius
  maxTargets?: MaxTargets
}
