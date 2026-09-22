import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherDir = {
  id: "01a0640f-850f-7f75-abe1-b02d6a21efda",
  type: "page-type/module",
  slug: "watcher-dir",
  definition: "the folder holding the watcher's downloads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder named relative is taken against the folder the server runs in.",
    },
  ],
} as const satisfies Module
