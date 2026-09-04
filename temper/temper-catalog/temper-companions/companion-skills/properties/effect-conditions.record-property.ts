import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { ConditionKind } from "./condition-kind.text-property.ts"
import type { ConditionWeaponType } from "./condition-weapon-type.text-property.ts"
import type { EnemyTypes } from "./enemy-types.text-property.ts"
import type { HealthBelow } from "./health-below.number-property.ts"
import type { IsCasting } from "./is-casting.boolean-property.ts"
import type { MaxDistance } from "./max-distance.number-property.ts"
import type { MinDistance } from "./min-distance.number-property.ts"
import type { TargetType } from "./target-type.text-property.ts"

export type EffectConditions = {
  type?: ConditionKind
  below?: HealthBelow
  targetType?: TargetType
  minDistance?: MinDistance
  maxDistance?: MaxDistance
  isCasting?: IsCasting
  weaponType?: ConditionWeaponType
  enemyTypes?: readonly EnemyTypes[]
}

export const effectConditions = {
  id: "01a06196-037c-761a-88dd-6339c805b996",
  pageTypeSlug: "record-property",
  slug: "effect-conditions",
  propertySlug: "conditions",
  definition: "what must hold for an effect to count",
  properties: [
    { pagePropertySlug: "condition-kind", required: false, many: false },
    { pagePropertySlug: "health-below", required: false, many: false },
    { pagePropertySlug: "target-type", required: false, many: false },
    { pagePropertySlug: "min-distance", required: false, many: false },
    { pagePropertySlug: "max-distance", required: false, many: false },
    { pagePropertySlug: "is-casting", required: false, many: false },
    { pagePropertySlug: "condition-weapon-type", required: false, many: false },
    { pagePropertySlug: "enemy-types", required: false, many: true, max: null },
  ],
} as const satisfies RecordProperty
