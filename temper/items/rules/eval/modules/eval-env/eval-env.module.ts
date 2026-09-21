import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const evalEnv = {
  id: "01a06137-f96b-7cf5-abc2-4f59c9d2db9a",
  type: "page-type/module",
  slug: "eval-env",
  definition: "the lookups a rule evaluation needs from outside the item's own facts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every lookup may answer unknown in place of a value.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No lookup declared here is asynchronous.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The evaluation context has the claim map and the stock groups beside the environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The context says whether the price source answered with no price table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A context saying nothing of that is read as a price source holding a table.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A wanted-equipment lookup takes equipType and traitType and quality as one bundle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lookup answering undefined holds nothing, and one answering unknown cannot say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill line is named by its temper id rather than by the number the game gives it.",
    },
  ],
} as const satisfies Module
