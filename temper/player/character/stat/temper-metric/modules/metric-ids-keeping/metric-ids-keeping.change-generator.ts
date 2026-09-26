import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const metricIdsKeeping = {
  id: "01a0def7-b4fa-7645-944c-705ba41c2359",
  type: "page-type/change-generator",
  slug: "metric-ids-keeping",
  definition: "the type naming every stat by its id, written again from the stat pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the stat pages rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat page added, taken away or renamed writes the type again in that landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page is read through the change rather than off the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ids are written in the order they sort in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type already with the body that would be written again is left alone.",
    },
  ],
} as const satisfies ChangeGenerator
