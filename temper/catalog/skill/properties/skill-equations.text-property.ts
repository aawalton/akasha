import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const skillEquations = {
  id: "01a1403a-1be8-7e56-bc40-e20174d45df3",
  type: "page-type/text-property",
  slug: "skill-equations",
  propertySlug: "equations",
  definition: "the equation for each number a skill's tooltip names, as UESP fit it",
  maxLength: 400,
  nameFormat: null,
  types: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An equation is kept as UESP wrote it, one per number the tooltip names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A constant every reading's tooltip shows otherwise is written as the live game shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number the live tooltip shows and UESP fit none for takes the next free placeholder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equation sits in the list where the live tooltip shows its number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A placeholder the tooltip shows twice is written again, tagged `Repeat`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A duration a passive lengthens is tagged with it where readings with and without it differ.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "UESP's equations are fit for game update 51.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "UESP's equations are known to be wrong in places.",
    },
  ],
  createdAt: "2026-10-15T15:41:52.487Z",
  updatedAt: "2026-10-21T02:29:23.868Z",
} as const satisfies TextProperty
