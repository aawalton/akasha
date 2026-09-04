import type { Module } from "@akasha/code-system/module"

export const companionVersionActions = {
  id: "01a06591-9eb0-7000-9053-bdd9b8e2dcfd",
  pageTypeSlug: "module",
  slug: "companion-version-actions",
  definition: "the saved versions of one companion build, fetched from a browser",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An answer that does not narrow is refused rather than passed on part-read.",
    },
    {
      invariantKind: "departure",
      statement: "A failure comes back as a message rather than as a raised error.",
    },
  ],
} as const satisfies Module
