import type { TemperMine } from "akasha/temper/player/character/temper-mine/temper-mine.page-type.types.ts"

export const eso = {
  id: "01a01d1a-a9eb-7000-aece-4fc7f8d2be92",
  type: "page-type/temper-mine",
  slug: "eso",
  title: "ESO",
  items: "jsonl",
  quests: "jsonl",
  partSpans: "jsonl",
} as const satisfies TemperMine
