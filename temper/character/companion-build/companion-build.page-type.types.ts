import type { BuildCorrelationId } from "akasha/temper/character/character-build/properties/build-correlation-id.text-property.types.ts"
import type { BuildTargetCount } from "akasha/temper/character/character-build/properties/build-target-count.number-property.types.ts"
import type { BuildVisibility } from "akasha/temper/character/character-build/properties/build-visibility.select-property.types.ts"
import type { BaseRoles } from "akasha/temper/character/companion-build/properties/base-roles.select-property.types.ts"
import type { BuildHash } from "akasha/temper/character/temper-build-version/properties/build-hash.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/character/thing/temper-character-thing.page-type.types.ts"

export type CompanionBuild = TemperCharacterThing & {
  buildHash: BuildHash
  visibility: BuildVisibility
  correlationId?: BuildCorrelationId
  targetCount?: BuildTargetCount
  baseRoles?: BaseRoles
}
