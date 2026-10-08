import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const effectSeconds = {
  id: "01a05fb0-3ceb-717f-94f6-5ef52cdf0c41",
  type: "page-type/number-property",
  slug: "effect-seconds",
  propertySlug: "seconds",
  definition: "how long an effect lasts",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect stating no seconds lasts as long as the thing carrying the effect.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:16:20.587Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
