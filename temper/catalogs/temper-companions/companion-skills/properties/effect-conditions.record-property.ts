import type { RecordProperty } from "@akasha/pages/record-property"
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
    { pagePropertySlug: "text-property/condition-kind", required: false, many: false },
    { pagePropertySlug: "number-property/health-below", required: false, many: false },
    { pagePropertySlug: "text-property/target-type", required: false, many: false },
    { pagePropertySlug: "number-property/min-distance", required: false, many: false },
    { pagePropertySlug: "number-property/max-distance", required: false, many: false },
    { pagePropertySlug: "boolean-property/is-casting", required: false, many: false },
    { pagePropertySlug: "text-property/condition-weapon-type", required: false, many: false },
    { pagePropertySlug: "text-property/enemy-types", required: false, many: true, maxCount: null },
  ],
} as const satisfies RecordProperty
