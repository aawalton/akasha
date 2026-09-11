import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const innateAxiom = {
  id: "019e668e-9a4b-7807-9909-0827a7901901",
  type: "temper-set",
  slug: "innate-axiom",
  title: "Innate Axiom",
  key: "innate-axiom",
  esoSetId: 351,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
