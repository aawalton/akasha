import type { CompletionVisibility } from "akasha/temper/character/temper-player/properties/completion-visibility.text-property.types.ts"
import type { Platform } from "akasha/temper/character/temper-player/properties/platform.select-property.types.ts"
import type { PlayerHandle } from "akasha/temper/character/temper-player/properties/player-handle.text-property.types.ts"
import type { Server } from "akasha/temper/character/temper-player/properties/server.select-property.types.ts"
import type { Settings } from "akasha/temper/character/temper-player/properties/settings.file-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/character/thing/temper-character-thing.page-type.types.ts"

export type TemperPlayer = TemperCharacterThing & {
  completionVisibility: CompletionVisibility
  platform?: Platform
  handle?: PlayerHandle
  server?: Server
  settings?: Settings
}
