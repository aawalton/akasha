import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsCheckpoint = boolean

export const isCheckpoint = {
  id: "01a0685d-89aa-709a-85e9-907d86ed7964",
  pageTypeSlug: "boolean-property",
  slug: "is-checkpoint",
  propertySlug: "is-checkpoint",
  definition: "whether a version was kept on purpose rather than taken as the build changed",
} as const satisfies BooleanProperty
