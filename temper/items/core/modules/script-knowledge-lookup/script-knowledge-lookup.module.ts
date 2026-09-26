import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scriptKnowledgeLookup = {
  id: "01a060e6-c3e6-7bba-973c-033c3a1970b5",
  type: "page-type/module",
  slug: "script-knowledge-lookup",
  definition: "the item number a scribing script is known by, found from the name of the script",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The scripts are the ones handed over last, and holding the skill catalogue hands them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name asked for before any scripts are handed over refuses rather than reading as unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on hands the script pages it compiled in, as it holds no catalogue.",
    },
  ],
} as const satisfies Module
