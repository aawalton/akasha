import type { BuildHash } from "akasha/temper/player/character/build/build-hash/properties/build-hash.text-property.types.ts"
import type { BuildCorrelationId } from "akasha/temper/player/character/character-build/properties/build-correlation-id.text-property.types.ts"
import type { BuildTargetCount } from "akasha/temper/player/character/character-build/properties/build-target-count.number-property.types.ts"
import type { BuildVisibility } from "akasha/temper/player/character/character-build/properties/build-visibility.select-property.types.ts"
import type { BaseRoles } from "akasha/temper/player/character/companion-build/properties/base-roles.select-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"

export type CompanionBuild = TemperCharacterThing & {
  buildHash: BuildHash
  visibility: BuildVisibility
  correlationId?: BuildCorrelationId
  targetCount?: BuildTargetCount
  baseRoles?: BaseRoles
}
