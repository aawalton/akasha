import type { SourceEffects } from "akasha/temper/player/character/source/temper-target/properties/source-effects.record-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperTarget = TemperThing & {
  effects: SourceEffects
}
