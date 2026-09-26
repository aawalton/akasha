import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { SourceEffects } from "akasha/temper/player/character/source/temper-target/properties/source-effects.record-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperEsoPlus = TemperThing & {
  description: Description
  effects?: SourceEffects
  hashPlace: HashPlace
}
