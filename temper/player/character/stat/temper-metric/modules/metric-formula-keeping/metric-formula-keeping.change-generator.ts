import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const metricFormulaKeeping = {
  id: "01a0df26-cc0c-714c-8a91-870f8f85191f",
  type: "page-type/change-generator",
  slug: "metric-formula-keeping",
  definition: "every stat formula file kept in the form the stat formula writer writes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A formula file a change writes is written again through the writer in that landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to the writer writes every formula file again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A formula file already in the writer's form is left alone.",
    },
  ],
  createdAt: "2026-09-26T19:17:36.908Z",
  updatedAt: "2026-09-26T19:18:09.000Z",
} as const satisfies ChangeGenerator
