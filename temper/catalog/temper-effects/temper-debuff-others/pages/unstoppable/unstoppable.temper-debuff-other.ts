import type { TemperDebuffOther } from "akasha/temper/catalog/temper-effects/temper-debuff-others/temper-debuff-other.page-type.types.ts"

export const unstoppable = {
  id: "01a05fc6-42ca-7a1a-86ec-7f9ae0c66f68",
  type: "temper-debuff-other",
  slug: "unstoppable",
  title: "Unstoppable",
  key: "unstoppable",
  description: "Immune to crowd control and snares",
} as const satisfies TemperDebuffOther
