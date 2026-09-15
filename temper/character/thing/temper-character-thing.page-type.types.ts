import type { Completion } from "akasha/temper/character/thing/properties/completion.file-property.types.ts"
import type { TargetBuildId } from "akasha/temper/character/thing/properties/target-build-id.text-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperCharacterThing = TemperThing & {
  completion?: Completion
  targetBuildId?: TargetBuildId
}
