import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportFights = {
  id: "01a1543b-3745-7729-80e1-a68a758bb5d3",
  type: "page-type/module",
  slug: "watcher-import-fights",
  definition:
    "the fights the combat add-on wrote, landed beside the pages of the characters who fought them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight lands beside the character page its character's name folds to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fight whose character has no page is named in the log and left in the game's file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight already beside its page lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "New fights are added after the fights already there, oldest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every character's fights land in one write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page beside a fights file this import made is told that file's ending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in every read, write and log this import makes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens the saved-variables file.",
    },
  ],
  createdAt: "2026-10-19T12:55:29.348Z",
  updatedAt: "2026-10-19T12:55:29.348Z",
} as const satisfies Module
