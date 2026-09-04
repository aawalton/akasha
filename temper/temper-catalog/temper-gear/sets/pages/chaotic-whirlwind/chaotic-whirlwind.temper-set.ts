import type { TemperSet } from "../../temper-set.page-type.ts"

export const chaoticWhirlwind = {
  id: "019e66ec-7a7e-7fdb-8130-826ad69f596b",
  pageTypeSlug: "temper-set",
  slug: "chaotic-whirlwind",
  title: "Chaotic Whirlwind",
  key: "chaotic-whirlwind",
  esoSetId: 365,
  subcategoryId: "trial",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
