import type { TemperSet } from "../../temper-set.page-type.types.ts"

export const prophets = {
  id: "019e6484-604c-7134-aae2-1ff64635300d",
  pageTypeSlug: "temper-set",
  type: "temper-set",
  slug: "prophets",
  title: "Prophet's",
  key: "prophets",
  esoSetId: 380,
  subcategoryId: "other",
  valid: [
    "axe",
    "dagger",
    "greatsword",
    "maul",
    "bow",
    "inferno-staff",
    "lightning-staff",
    "restoration-staff",
    "shield",
    "ring",
  ],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
