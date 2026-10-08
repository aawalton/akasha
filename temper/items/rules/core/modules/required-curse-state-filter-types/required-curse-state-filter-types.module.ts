import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requiredCurseStateFilterTypes = {
  id: "01a060d9-44cb-78f1-8dc5-2403ee402ba2",
  type: "page-type/module",
  slug: "required-curse-state-filter-types",
  definition: "the shape of the condition asking that a character be a vampire or a werewolf",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Vampirism and lycanthropy are the two curses this condition asks after.",
    },
  ],
  createdAt: "2026-09-02T06:40:46.795Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
