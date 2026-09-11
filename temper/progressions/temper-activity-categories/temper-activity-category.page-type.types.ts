import type { BadgeVariant } from "akasha/temper/progressions/temper-activity-categories/properties/badge-variant.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperActivityCategory = TemperProgressThing & {
  key: Key
  badgeVariant: BadgeVariant
}
