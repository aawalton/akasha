import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksRuntimeState = {
  id: "01a06194-be47-7ab2-90d9-5b60b4f62b61",
  type: "module",
  slug: "lorebooks-runtime-state",
  definition: "what the add-on has worked out about the map the player is on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The LibGPS3 handle every map reading here goes through is taken once, here.",
    },
  ],
} as const satisfies Module
