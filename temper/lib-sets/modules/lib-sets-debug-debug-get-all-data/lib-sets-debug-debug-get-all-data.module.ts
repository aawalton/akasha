import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDebugDebugGetAllData = {
  id: "01a0623c-2df8-7dd3-89c1-ace3a2cc6855",
  type: "page-type/module",
  slug: "lib-sets-debug-debug-get-all-data",
  definition: "the whole-client data run that repeats itself once per supported language",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The values come from the live game client rather than a capture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run changes the client language setting to reach the next language.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A slash command option is the only thing in the library that starts this run.",
    },
  ],
} as const satisfies Module
