import type { TemperSet } from "../../temper-set.page-type.ts"

export const healingMage = {
  id: "019e66ec-7b33-7c6c-91c1-fc2803cb1ead",
  pageTypeSlug: "temper-set",
  slug: "healing-mage",
  title: "Healing Mage",
  key: "healing-mage",
  esoSetId: 141,
  subcategoryId: "trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
