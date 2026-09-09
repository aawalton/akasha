import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const silence = {
  id: "01a05fc6-42c9-7d72-84ab-9d0e215c3b7b",
  pageTypeSlug: "temper-debuff-other",
  slug: "silence",
  title: "Silence",
  key: "silence",
  description: "Target cannot cast abilities",
} as const satisfies TemperDebuffOther
