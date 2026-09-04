import type { Module } from "@akasha/code-system/module"

export const nextBossInit = {
  id: "01a06157-835a-7077-b8f8-19565f5b9153",
  pageTypeSlug: "module",
  slug: "next-boss-init",
  definition: "the order this tracker's parts are wired up in once the add-on loads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The string ids are made before a module reads a string id.",
    },
    {
      invariantKind: "departure",
      statement: "Every module filling in the shared table is loaded before the table is used.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tracker starts idle and the first zone change decides whether the tracker listens.",
    },
    {
      invariantKind: "departure",
      statement: "A slash command marks a district dead by its number on the round.",
    },
  ],
} as const satisfies Module
