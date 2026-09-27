import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kioskLocationName = {
  id: "01a0609b-e59e-7045-b6df-6ee2d2b62d25",
  type: "page-type/module",
  slug: "kiosk-location-name",
  definition: "the zone and the city each guild kiosk id names",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kiosk's name is the title its guild trader page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A guild trader page stating no kiosk id or title is refused rather than skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One reading of the guild trader pages is held, and a new reading replaces it whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kiosk id no guild trader page claims answers with its own number.",
    },
  ],
} as const satisfies Module
