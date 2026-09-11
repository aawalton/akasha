import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { ConditionKind } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/condition-kind.text-property.types.ts"
import type { ConditionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/condition-weapon-type.text-property.types.ts"
import type { EnemyTypes } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/enemy-types.text-property.types.ts"
import type { HealthBelow } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/health-below.number-property.types.ts"
import type { IsCasting } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/is-casting.boolean-property.types.ts"
import type { MaxDistance } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/max-distance.number-property.types.ts"
import type { MinDistance } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/min-distance.number-property.types.ts"
import type { TargetType } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/target-type.text-property.types.ts"

export type EffectConditions = {
  type?: ConditionKind
  below?: HealthBelow
  targetType?: TargetType
  minDistance?: MinDistance
  maxDistance?: MaxDistance
  isCasting?: IsCasting
  weaponType?: ConditionWeaponType
  enemyTypes?: EnemyTypes
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
