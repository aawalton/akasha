import type { CompletionVisibility } from "akasha/temper/player/character/temper-account/properties/completion-visibility.text-property.types.ts"
import type { Platform } from "akasha/temper/player/character/temper-account/properties/platform.select-property.types.ts"
import type { PlayerHandle } from "akasha/temper/player/character/temper-account/properties/player-handle.text-property.types.ts"
import type { Server } from "akasha/temper/player/character/temper-account/properties/server.select-property.types.ts"
import type { Settings } from "akasha/temper/player/character/temper-account/properties/settings.file-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"

export type TemperPlayer = TemperCharacterThing & {
  completionVisibility: CompletionVisibility
  platform?: Platform
  handle?: PlayerHandle
  server?: Server
  settings?: Settings
}
