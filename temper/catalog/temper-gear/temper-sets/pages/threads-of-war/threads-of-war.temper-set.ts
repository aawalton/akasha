import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const threadsOfWar = {
  id: "019e668e-9a6c-77dc-95f9-a53aeacba0df",
  type: "temper-set",
  slug: "threads-of-war",
  title: "Threads of War",
  key: "threads-of-war",
  esoSetId: 765,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
