import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { EsoDisplayName } from "./properties/eso-display-name.text-property.ts"
import type { WorldName } from "./properties/world-name.text-property.ts"

export type TemperAccount = TemperCharacterThing & {
  displayName?: EsoDisplayName
  worldName?: WorldName
}
