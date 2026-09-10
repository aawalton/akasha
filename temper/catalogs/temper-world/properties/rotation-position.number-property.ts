import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type RotationPosition = number

export const rotationPosition = {
  id: "01a05fc4-7a93-73a4-975e-3d64799db4da",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "rotation-position",
  propertySlug: "rotation-position",
  definition: "where a dungeon falls in its pledge rotation",
  max: null,
} as const satisfies NumberProperty
