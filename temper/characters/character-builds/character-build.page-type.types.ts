import type { BuildCorrelationId } from "akasha/temper/characters/character-builds/properties/build-correlation-id.text-property.types.ts"
import type { BuildTargetCount } from "akasha/temper/characters/character-builds/properties/build-target-count.number-property.types.ts"
import type { BuildVisibility } from "akasha/temper/characters/character-builds/properties/build-visibility.select-property.types.ts"
import type { CharacterRoles } from "akasha/temper/characters/temper-account-characters/properties/character-roles.relation-property.types.ts"
import type { BuildHash } from "akasha/temper/characters/temper-build-versions/properties/build-hash.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/characters/things/temper-character-thing.page-type.types.ts"

export type CharacterBuild = TemperCharacterThing & {
  buildHash: BuildHash
  visibility: BuildVisibility
  correlationId?: BuildCorrelationId
  targetCount?: BuildTargetCount
  roles?: CharacterRoles
}
