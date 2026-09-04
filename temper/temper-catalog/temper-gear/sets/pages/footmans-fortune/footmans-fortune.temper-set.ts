import type { TemperSet } from "../../temper-set.page-type.ts"

export const footmansFortune = {
  id: "019e6484-5fac-7e79-8042-1b75ce538721",
  pageTypeSlug: "temper-set",
  slug: "footmans-fortune",
  title: "Footman's Fortune",
  key: "footmans-fortune",
  esoSetId: 24,
  subcategoryId: "arena",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
