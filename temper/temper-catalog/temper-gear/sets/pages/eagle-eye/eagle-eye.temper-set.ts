import type { TemperSet } from "../../temper-set.page-type.ts"

export const eagleEye = {
  id: "019e66ec-76f5-7e48-93f0-c502da95dd60",
  pageTypeSlug: "temper-set",
  slug: "eagle-eye",
  title: "Eagle Eye",
  key: "eagle-eye",
  esoSetId: 130,
  subcategoryId: "pvp",
  valid: ["jewelry:*", "bow", "inferno-staff", "ice-staff", "lightning-staff", "restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
