import type { TemperResource } from "akasha/temper/catalog/skill/resource/temper-resource.page-type.types.ts"

export const health = {
  id: "01a0e2cf-f14f-7600-8a4a-c92753db3e41",
  type: "page-type/temper-resource",
  slug: "health",
  title: "Health",
  key: "health",
  displayOrder: 32,
} as const satisfies TemperResource
