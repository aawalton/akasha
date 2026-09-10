import type { Key } from "../../things/properties/key.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"
import type { BadgeVariant } from "./properties/badge-variant.text-property.ts"

export type TemperActivityCategory = TemperProgressThing & {
  key: Key
  badgeVariant: BadgeVariant
}
