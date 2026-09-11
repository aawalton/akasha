import type { CharacterRoles } from "../temper-account-characters/properties/character-roles.relation-property.types.ts"
import type { BuildHash } from "../temper-build-versions/properties/build-hash.text-property.types.ts"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { BuildCorrelationId } from "./properties/build-correlation-id.text-property.types.ts"
import type { BuildTargetCount } from "./properties/build-target-count.number-property.types.ts"
import type { BuildVisibility } from "./properties/build-visibility.select-property.types.ts"

export type CharacterBuild = TemperCharacterThing & {
  buildHash: BuildHash
  visibility: BuildVisibility
  correlationId?: BuildCorrelationId
  targetCount?: BuildTargetCount
  roles?: CharacterRoles
}
