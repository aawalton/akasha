import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { CompletionVisibility } from "./properties/completion-visibility.text-property.ts"
import type { Platform } from "./properties/platform.select-property.ts"
import type { PlayerHandle } from "./properties/player-handle.text-property.ts"
import type { Server } from "./properties/server.select-property.ts"
import type { Settings } from "./properties/settings.file-property.ts"

export type TemperPlayer = TemperCharacterThing & {
  completionVisibility: CompletionVisibility
  platform?: Platform
  handle?: PlayerHandle
  server?: Server
  settings?: Settings
}
