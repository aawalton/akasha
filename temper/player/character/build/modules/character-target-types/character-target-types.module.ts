import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterTargetTypes = {
  id: "01a18410-1f47-71e4-bcf3-62a96f9bb1c1", type: "page-type/module",
  slug: "character-target-types",
  definition: "the shape a character's target build is handed to the characters add-on in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every id a target holds is the game's own id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every id a target holds comes with the name the build gives it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here imports anything, so the add-on and the watcher both read it.",
    },
  ], createdAt: "2026-10-28T19:50:11.525Z", updatedAt: "2026-10-28T19:50:11.525Z",
} as const satisfies Module
