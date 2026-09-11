import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const marksmansCrest = {
  id: "019e66ec-780f-7936-9456-00ffc220186c",
  type: "temper-set",
  slug: "marksmans-crest",
  title: "Marksman's Crest",
  key: "marksmans-crest",
  esoSetId: 234,
  subcategoryId: "pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
