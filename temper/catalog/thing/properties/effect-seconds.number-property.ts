import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const effectSeconds = {
  id: "01a05fb0-3ceb-717f-94f6-5ef52cdf0c41",
  type: "page-type/number-property",
  slug: "effect-seconds",
  propertySlug: "seconds",
  definition: "how long an effect lasts",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An effect stating no seconds lasts as long as the thing carrying the effect.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
