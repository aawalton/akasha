import type { TemperSet } from "../../temper-set.page-type.ts"

export const affliction = {
  id: "019e66ec-75f2-76dd-8728-c3fc3e33b1df",
  pageTypeSlug: "temper-set",
  slug: "affliction",
  title: "Affliction",
  key: "affliction",
  esoSetId: 101,
  subcategoryId: "pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
