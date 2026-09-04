import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const immobilize = {
  id: "01a05fc6-42c8-7d77-86a2-a7b6d89bc039",
  pageTypeSlug: "temper-debuff-other",
  slug: "immobilize",
  title: "Immobilize",
  key: "immobilize",
  description: "Target cannot move but can still attack",
} as const satisfies TemperDebuffOther
