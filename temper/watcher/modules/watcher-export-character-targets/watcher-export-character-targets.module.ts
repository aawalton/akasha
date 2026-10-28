import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherExportCharacterTargets = {
  id: "01a1840c-9dd5-71f7-aee9-7a06110bc91f",
  type: "page-type/module",
  slug: "watcher-export-character-targets",
  definition: "each character's target build, in the game's own ids, for the characters add-on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A target is keyed by the game's id of its character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a character whose target build decodes has a target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on is handed game ids and names, and never decodes a build hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A discipline's stars put its slotted stars first and name each star once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty bar or champion slot is handed over as id 0 rather than left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty gear slot is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scribed skill is named and has no ability id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalogs are read only once a character has a target build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the reader of the pages and the read of the catalogs.",
    },
  ],
  createdAt: "2026-10-28T19:46:21.781Z",
  updatedAt: "2026-10-28T19:46:21.781Z",
} as const satisfies Module
