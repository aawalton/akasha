import type { TemperResource } from "akasha/temper/catalog/skill/resource/temper-resource.page-type.types.ts"

export const magicka = {
  id: "01a0e2cf-f150-78ee-87e1-0a9b3ebe3c2d",
  type: "page-type/temper-resource",
  slug: "magicka",
  title: "Magicka",
  key: "magicka",
  displayOrder: 1,
} as const satisfies TemperResource
