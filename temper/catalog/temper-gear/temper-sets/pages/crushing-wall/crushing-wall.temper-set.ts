import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const crushingWall = {
  id: "019e6484-5fa4-7ff7-b288-ff59644ed30f",
  type: "temper-set",
  slug: "crushing-wall",
  title: "Crushing Wall",
  key: "crushing-wall",
  esoSetId: 373,
  subcategoryId: "arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
