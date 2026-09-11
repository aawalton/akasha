import type { Completion } from "akasha/temper/characters/things/properties/completion.file-property.types.ts"
import type { TargetBuildId } from "akasha/temper/characters/things/properties/target-build-id.text-property.types.ts"
import type { TemperThing } from "akasha/temper/things/temper-thing.page-type.types.ts"

export type TemperCharacterThing = TemperThing & {
  completion?: Completion
  targetBuildId?: TargetBuildId
}
