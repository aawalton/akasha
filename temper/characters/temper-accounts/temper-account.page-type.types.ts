import type { EsoDisplayName } from "akasha/temper/characters/temper-accounts/properties/eso-display-name.text-property.types.ts"
import type { WorldName } from "akasha/temper/characters/temper-accounts/properties/world-name.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/characters/things/temper-character-thing.page-type.types.ts"

export type TemperAccount = TemperCharacterThing & {
  displayName?: EsoDisplayName
  worldName?: WorldName
}
