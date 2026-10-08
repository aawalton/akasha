import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bundleMemberSavedVars = {
  id: "01a06072-5abd-75b9-b1b8-07150462637e",
  type: "page-type/module",
  slug: "bundle-member-saved-vars",
  definition: "an addon's saved variables lifted back out of the bundle file with them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A member's globals are named by the member's own `addon.json`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member naming no global is skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member named for the bundle file is skipped, as no file holds itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A migration already done leaves a marker naming the globals written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A marker present at all means the migration is done.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The marker has the digest of the bundle file read from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here removes the member's globals from the bundle file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a migration did.",
    },
  ],
  createdAt: "2026-09-02T04:48:22.205Z",
  updatedAt: "2026-09-22T10:16:12.000Z",
} as const satisfies Module
