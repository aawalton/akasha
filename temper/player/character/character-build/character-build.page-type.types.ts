import type { BuildCharacterName } from "akasha/temper/player/character/character-build/properties/build-character-name.text-property.types.ts"
import type { BuildCorrelationId } from "akasha/temper/player/character/character-build/properties/build-correlation-id.text-property.types.ts"
import type { BuildTargetCount } from "akasha/temper/player/character/character-build/properties/build-target-count.number-property.types.ts"
import type { BuildVisibility } from "akasha/temper/player/character/character-build/properties/build-visibility.select-property.types.ts"
import type { CharacterRoles } from "akasha/temper/player/character/temper-account-character/properties/character-roles.multi-relation-property.types.ts"
import type { BuildHash } from "akasha/temper/player/character/temper-build-version/properties/build-hash.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"

export type CharacterBuild = TemperCharacterThing & {
  buildHash: BuildHash
  visibility: BuildVisibility
  correlationId?: BuildCorrelationId
  targetCount?: BuildTargetCount
  roles?: CharacterRoles
  characterName?: BuildCharacterName
}
