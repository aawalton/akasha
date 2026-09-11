import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { ConditionKind } from "./condition-kind.text-property.types.ts"
import type { ConditionWeaponType } from "./condition-weapon-type.text-property.types.ts"
import type { EnemyTypes } from "./enemy-types.text-property.types.ts"
import type { HealthBelow } from "./health-below.number-property.types.ts"
import type { IsCasting } from "./is-casting.boolean-property.types.ts"
import type { MaxDistance } from "./max-distance.number-property.types.ts"
import type { MinDistance } from "./min-distance.number-property.types.ts"
import type { TargetType } from "./target-type.text-property.types.ts"

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
  type: "record-property",
  slug: "effect-conditions",
  propertySlug: "conditions",
  definition: "what must hold for an effect to count",
  properties: [
    { pageProperty: "text-property/condition-kind", required: false, many: false },
    { pageProperty: "number-property/health-below", required: false, many: false },
    { pageProperty: "text-property/target-type", required: false, many: false },
    { pageProperty: "number-property/min-distance", required: false, many: false },
    { pageProperty: "number-property/max-distance", required: false, many: false },
    { pageProperty: "boolean-property/is-casting", required: false, many: false },
    { pageProperty: "text-property/condition-weapon-type", required: false, many: false },
    { pageProperty: "text-property/enemy-types", required: false, many: true, maxCount: null },
  ],
} as const satisfies RecordProperty
