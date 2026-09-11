import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const versionNumber = {
  id: "01a0685d-89aa-7db6-80a4-051cc91b50b2",
  type: "number-property",
  slug: "version-number",
  propertySlug: "version-number",
  definition: "where a version falls in the run of versions of one build",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
