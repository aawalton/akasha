import type { TemperSet } from "../../temper-set.page-type.types.ts"

export const wrathOfElements = {
  id: "019e6484-5fdb-7bcc-afb4-4d41c351d65e",
  pageTypeSlug: "temper-set",
  type: "temper-set",
  slug: "wrath-of-elements",
  title: "Wrath of Elements",
  key: "wrath-of-elements",
  esoSetId: 561,
  subcategoryId: "arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
