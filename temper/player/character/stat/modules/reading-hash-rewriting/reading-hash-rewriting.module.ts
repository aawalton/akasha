import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readingHashRewriting = {
  id: "01a15abc-fdbd-7bf0-9ccf-0fa265cd3fee",
  type: "page-type/module",
  slug: "reading-hash-rewriting",
  definition: "a reading's build hash written again from what the reading wore",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hash written again is kept only where it reads back as the build it was written from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readings file is named for the character whose folder holds it.",
    },
  ],
  createdAt: "2026-10-20T19:14:57.596Z",
  updatedAt: "2026-10-20T19:14:57.596Z",
} as const satisfies Module
