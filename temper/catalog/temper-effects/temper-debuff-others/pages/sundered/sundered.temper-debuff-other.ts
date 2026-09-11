import type { TemperDebuffOther } from "akasha/temper/catalog/temper-effects/temper-debuff-others/temper-debuff-other.page-type.types.ts"

export const sundered = {
  id: "01a05fc6-42ca-742d-913c-2ad03d8d5bbc",
  type: "temper-debuff-other",
  slug: "sundered",
  title: "Sundered",
  key: "sundered",
  description: "Applies Major Breach, reducing resistances",
  effects: "jsonl",
} as const satisfies TemperDebuffOther
