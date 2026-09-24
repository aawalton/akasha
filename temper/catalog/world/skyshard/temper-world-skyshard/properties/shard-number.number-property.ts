import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const shardNumber = {
  id: "01a0d5d4-6c7f-727e-9674-c8163997a937",
  type: "page-type/number-property",
  slug: "shard-number",
  propertySlug: "shard-number",
  definition: "the place a skyshard has among the skyshards its achievement counts",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
