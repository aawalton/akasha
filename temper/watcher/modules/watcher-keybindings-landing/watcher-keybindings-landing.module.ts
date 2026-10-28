import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherKeybindingsLanding = {
  id: "01a1848d-d33a-7d87-8ba3-a1a011b64c38",
  type: "page-type/module",
  slug: "watcher-keybindings-landing",
  definition: "the keybinder's capture in Temper.lua, landed on the keybinding pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page the capture changes lands in one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture changing no page commits nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saved variables holding no keybinder capture land nothing and refuse nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page landed new is given an id the watcher mints.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The landing runs before the export, so the next config carries what landed.",
    },
  ],
  createdAt: "2026-10-28T22:07:29.593Z",
  updatedAt: "2026-10-28T22:07:29.593Z",
} as const satisfies Module
