import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCadwellTally = {
  id: "01a0c960-6cb4-73ec-b22b-1d3488ca94e8",
  type: "page-type/module",
  slug: "completion-cadwell-tally",
  definition: "how many of a character's almanac stops are done out of all of them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop is counted from the character's own record rather than from the catalog.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path names the level, and a second step names the zone within that level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path naming a level or a zone that is not there is answered with nothing.",
    },
  ],
} as const satisfies Module
