import type { BuildCorrelationId } from "../character-builds/properties/build-correlation-id.text-property.ts"
import type { BuildTargetCount } from "../character-builds/properties/build-target-count.number-property.ts"
import type { BuildVisibility } from "../character-builds/properties/build-visibility.select-property.types.ts"
import type { BuildHash } from "../temper-build-versions/properties/build-hash.text-property.ts"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { BaseRoles } from "./properties/base-roles.select-property.types.ts"

export type CompanionBuild = TemperCharacterThing & {
  buildHash: BuildHash
  visibility: BuildVisibility
  correlationId?: BuildCorrelationId
  targetCount?: BuildTargetCount
  baseRoles?: BaseRoles
}
