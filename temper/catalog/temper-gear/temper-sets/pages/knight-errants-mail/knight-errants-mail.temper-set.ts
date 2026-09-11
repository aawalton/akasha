import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const knightErrantsMail = {
  id: "019e66e6-a099-79b9-b689-ed17ce46a343",
  type: "temper-set",
  slug: "knight-errants-mail",
  title: "Knight-errant's Mail",
  key: "knight-errants-mail",
  esoSetId: 309,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
