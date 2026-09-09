import type { TemperThing } from "../../things/temper-thing.page-type.ts"
import type { Completion } from "./properties/completion.file-property.ts"
import type { TargetBuildId } from "./properties/target-build-id.text-property.ts"

export type TemperCharacterThing = TemperThing & {
  completion?: Completion
  targetBuildId?: TargetBuildId
}
