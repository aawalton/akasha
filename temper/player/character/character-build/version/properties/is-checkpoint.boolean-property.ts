import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const isCheckpoint = {
  id: "01a0685d-89aa-709a-85e9-907d86ed7964",
  type: "page-type/boolean-property",
  slug: "is-checkpoint",
  propertySlug: "is-checkpoint",
  definition: "whether a version was kept on purpose rather than taken as the build changed",
  types: "ts",
  createdAt: "2026-09-03T17:42:35.690Z",
  updatedAt: "2026-09-25T12:44:26.000Z",
} as const satisfies BooleanProperty
