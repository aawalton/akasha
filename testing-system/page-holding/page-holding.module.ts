import type { Module } from "@akasha/code/module"

export const pageHolding = {
  id: "01a07bd7-36a3-7a1c-92e1-95945d838fd0",
  pageTypeSlug: "module",
  slug: "page-holding",
  definition: "the paths a test's page and its code sit at, and the body of that code",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body imports a path named here.",
    },
    {
      invariantKind: "departure",
      statement: "A path is said from the repository root.",
    },
  ],
} as const satisfies Module
