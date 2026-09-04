import type { Module } from "@akasha/code-system/module"

export const libSetsDebugDebugGetAllData = {
  id: "01a0623c-2df8-7dd3-89c1-ace3a2cc6855",
  pageTypeSlug: "module",
  slug: "lib-sets-debug-debug-get-all-data",
  definition: "the whole-client data run that repeats itself once per supported language",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The values come from the live game client rather than a capture.",
    },
    {
      invariantKind: "departure",
      statement: "The run changes the client language setting to reach the next language.",
    },
    {
      invariantKind: "constraint",
      statement: "A slash command option is the only thing in the library that starts this run.",
    },
  ],
} as const satisfies Module
