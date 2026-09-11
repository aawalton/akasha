import type { CompletionVisibility } from "akasha/temper/characters/temper-players/properties/completion-visibility.text-property.types.ts"
import type { Platform } from "akasha/temper/characters/temper-players/properties/platform.select-property.types.ts"
import type { PlayerHandle } from "akasha/temper/characters/temper-players/properties/player-handle.text-property.types.ts"
import type { Server } from "akasha/temper/characters/temper-players/properties/server.select-property.types.ts"
import type { Settings } from "akasha/temper/characters/temper-players/properties/settings.file-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/characters/things/temper-character-thing.page-type.types.ts"

export type TemperPlayer = TemperCharacterThing & {
  completionVisibility: CompletionVisibility
  platform?: Platform
  handle?: PlayerHandle
  server?: Server
  settings?: Settings
}
