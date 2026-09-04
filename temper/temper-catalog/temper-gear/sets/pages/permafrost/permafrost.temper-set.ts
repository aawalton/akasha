import type { TemperSet } from "../../temper-set.page-type.ts"

export const permafrost = {
  id: "019e6484-5fcd-733d-8f3d-ff2edb6c4ce4",
  pageTypeSlug: "temper-set",
  slug: "permafrost",
  title: "Permafrost",
  key: "permafrost",
  esoSetId: 211,
  subcategoryId: "arena",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
