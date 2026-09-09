import type { TemperMine } from "../../temper-mine.page-type.ts"

export const eso = {
  id: "01a01d1a-a9eb-7000-aece-4fc7f8d2be92",
  pageTypeSlug: "temper-mine",
  slug: "eso",
  title: "ESO",
  items: "jsonl",
  quests: "jsonl",
} as const satisfies TemperMine
