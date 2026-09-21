import type { BadgeVariant } from "akasha/temper/player/progress/temper-activity-category/properties/badge-variant.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperActivityCategory = TemperProgressThing & {
  key: Key
  badgeVariant: BadgeVariant
}
