import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hostFiles = {
  id: "01a15501-be16-700a-b4a4-82e0194017bf",
  type: "page-type/module",
  slug: "host-files",
  definition: "the files of an addon's that the watcher writes into the game's addons folder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon's host files are the extra Lua files its manifest lists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest read is the one in the tree the addon was built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host file's live copy is looked for in the game's addons folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest whose extra Lua files go unread is refused rather than read as none.",
    },
  ],
  createdAt: "2026-10-19T16:32:19.989Z",
  updatedAt: "2026-10-19T16:32:19.989Z",
} as const satisfies Module
