import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const buildTargetCount = {
  id: "01a06862-c4ee-70c5-9850-11bd6c7f9df0",
  type: "number-property",
  slug: "build-target-count",
  propertySlug: "target-count",
  definition: "how many characters are aimed at this build",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
