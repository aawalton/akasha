import type { TemperResource } from "akasha/temper/catalog/skill/resource/temper-resource.page-type.types.ts"

export const stamina = {
  id: "01a0e2cf-f150-70cb-9675-98a5189420d4",
  type: "page-type/temper-resource",
  slug: "stamina",
  title: "Stamina",
  key: "stamina",
  displayOrder: 4,
} as const satisfies TemperResource
