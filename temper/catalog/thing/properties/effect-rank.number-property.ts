import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const effectRank = {
  id: "01a15680-be5f-70b3-b934-8bfe56e05f1e",
  type: "page-type/number-property",
  slug: "effect-rank",
  propertySlug: "rank",
  definition: "the rank of a passive an effect holds at",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect stating a rank holds only while its passive is at that rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect stating no rank holds at every rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build stating no rank for a passive holds that passive at the rank its page states.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-19T23:30:40.351Z",
  updatedAt: "2026-10-19T23:30:40.351Z",
} as const satisfies NumberProperty
