import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherPageContentAddonsNeed = {
  id: "01a0e2b2-5f0c-7840-8776-9b31b170e0a7",
  type: "page-type/temper-web-phrase",
  slug: "watcher-page-content-addons-need",
  title: "Why the Watcher needs the Temper add-ons",
  description:
    "{name} The Watcher does not read the game directly. It reads the SavedVariables files that the Temper add-ons — {characters} and {items} — write while you play. Without those add-ons installed in ESO there are no files to read, and nothing will sync no matter how the rest of the setup goes. You download them from Temper, below.",
  createdAt: "2026-09-27T11:48:55.692Z",
  updatedAt: "2026-09-27T11:49:02.000Z",
} as const satisfies TemperWebPhrase
