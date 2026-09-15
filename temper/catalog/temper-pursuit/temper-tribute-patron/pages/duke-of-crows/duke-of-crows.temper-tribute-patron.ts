import type { TemperTributePatron } from "akasha/temper/catalog/temper-pursuit/temper-tribute-patron/temper-tribute-patron.page-type.types.ts"

export const dukeOfCrows = {
  id: "01a06153-0eaa-7001-8805-706f7471901d",
  type: "page-type/temper-tribute-patron",
  slug: "duke-of-crows",
  title: "Duke of Crows",
  category: "patrons",
  esoPatronId: 4,
  esoCollectibleId: 10406,
  cards: "jsonl",
} as const satisfies TemperTributePatron
