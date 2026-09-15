import type { EsoDisplayName } from "akasha/temper/character/temper-account/properties/eso-display-name.text-property.types.ts"
import type { WorldName } from "akasha/temper/character/temper-account/properties/world-name.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/character/thing/temper-character-thing.page-type.types.ts"

export type TemperAccount = TemperCharacterThing & {
  displayName?: EsoDisplayName
  worldName?: WorldName
}
