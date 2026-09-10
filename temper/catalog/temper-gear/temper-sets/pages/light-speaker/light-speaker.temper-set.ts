import type { TemperSet } from "../../temper-set.page-type.types.ts"

export const lightSpeaker = {
  id: "019e66e6-a09f-7e46-a6bc-ee9684c1539b",
  pageTypeSlug: "temper-set",
  type: "temper-set",
  slug: "light-speaker",
  title: "Light Speaker",
  key: "light-speaker",
  esoSetId: 298,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
