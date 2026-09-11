import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const mightyChudan = {
  id: "019e6484-6007-7c51-916f-a58010dfa650",
  type: "temper-set",
  slug: "mighty-chudan",
  title: "Mighty Chudan",
  key: "mighty-chudan",
  esoSetId: 256,
  subcategoryId: "monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
