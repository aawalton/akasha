import type { TemperDebuffOther } from "akasha/temper/catalog/temper-effects/temper-debuff-others/temper-debuff-other.page-type.types.ts"

export const offBalance = {
  id: "01a05fc6-42c9-771f-a300-69d3eb7f8795",
  type: "temper-debuff-other",
  slug: "off-balance",
  title: "Off Balance",
  key: "off-balance",
  description: "Allows Heavy Attacks to restore double resources and stun (non-boss enemies)",
} as const satisfies TemperDebuffOther
