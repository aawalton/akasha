import type { PageType } from "@akasha/pages/page-type"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.ts"
import type { CompletionVisibility } from "./properties/completion-visibility.text-property.ts"
import type { Platform } from "./properties/platform.select-property.ts"
import type { PlayerHandle } from "./properties/player-handle.text-property.ts"
import type { Server } from "./properties/server.select-property.ts"
import type { Settings } from "./properties/settings.file-property.ts"

export type TemperPlayer = TemperCharacterThing & {
  completionVisibility: CompletionVisibility
  handle?: PlayerHandle
  platform?: Platform
  server?: Server
  settings?: Settings
}

export const temperPlayer = {
  id: "01a05fcd-f558-7259-93c1-1504762aa59c",
  pageTypeSlug: "page-type",
  slug: "temper-player",
  definition: "the person behind an account, and how that person has asked temper to behave",
  pluralSlug: "temper-players",
  extends: ["page-type/temper-character-thing"],
  parts: [
    "file-property/settings",
    "select-property/platform",
    "select-property/server",
    "text-property/completion-visibility",
    "text-property/player-handle",
  ],
  properties: [
    { pagePropertySlug: "text-property/completion-visibility", required: true, many: false },
    { pagePropertySlug: "select-property/platform", required: false, many: false },
    { pagePropertySlug: "text-property/player-handle", required: false, many: false },
    { pagePropertySlug: "select-property/server", required: false, many: false },
    { pagePropertySlug: "file-property/settings", required: false, many: false },
  ],
} as const satisfies PageType
