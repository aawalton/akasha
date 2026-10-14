import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricCalculator = {
  id: "01a06271-abd0-7258-9fc4-ca306f191976",
  type: "page-type/module",
  slug: "metric-calculator",
  definition: "every metric a build reaches on one bar, calculated in dependency order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build's estimate on its own infers its buffs from what the build slots and wears.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An estimate for a reading takes exactly the buffs the game listed, and infers none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff the game listed is matched to a buff page by the name the game gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading's food and mundus stone are the ones the game listed, matched by ability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff the game listed that no buff page names is told rather than dropped.",
    },
  ],
  createdAt: "2026-09-02T14:06:51.856Z",
  updatedAt: "2026-10-14T14:22:44.213Z",
} as const satisfies Module
