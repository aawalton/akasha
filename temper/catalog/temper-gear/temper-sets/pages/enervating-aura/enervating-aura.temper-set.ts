import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const enervatingAura = {
  id: "019e66ec-771b-7fbf-9254-0d86cce5fb5b",
  type: "temper-set",
  slug: "enervating-aura",
  title: "Enervating Aura",
  key: "enervating-aura",
  esoSetId: 631,
  subcategoryId: "pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
