import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const armorOfTheCode = {
  id: "019e6484-6046-7084-9dfd-723b3d203577",
  type: "temper-set",
  slug: "armor-of-the-code",
  title: "Armor of the Code",
  key: "armor-of-the-code",
  esoSetId: 209,
  subcategoryId: "other",
  valid: ["jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
