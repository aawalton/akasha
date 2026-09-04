import type { TemperSet } from "../../temper-set.page-type.ts"

export const graceOfTheAncients = {
  id: "019e66ec-7751-7c04-9a76-1d1ab336223c",
  pageTypeSlug: "temper-set",
  slug: "grace-of-the-ancients",
  title: "Grace of the Ancients",
  key: "grace-of-the-ancients",
  esoSetId: 126,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
