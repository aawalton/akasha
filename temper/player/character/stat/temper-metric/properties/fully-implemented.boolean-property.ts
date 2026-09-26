import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const fullyImplemented = {
  id: "01a0de62-56d0-709a-b88a-4d0386984f2a",
  type: "page-type/boolean-property",
  slug: "fully-implemented",
  propertySlug: "fully-implemented",
  definition: "whether every source the game counts toward a stat is counted here",
  types: "ts",
} as const satisfies BooleanProperty
