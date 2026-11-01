import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const buildIcon = {
  id: "01a198c1-a5f5-70b3-a362-57bb2de152a8",
  type: "page-type/number-property",
  slug: "build-icon",
  propertySlug: "build-icon",
  definition: "which of the game's Armory build icons a build shows",
  max: 78,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build stating no icon shows the first icon.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T20:16:30.196Z",
  updatedAt: "2026-11-01T20:16:30.196Z",
} as const satisfies NumberProperty
