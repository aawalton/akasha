import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const liveVersion = {
  id: "01a05c48-deeb-700f-82ef-afcd8de33755",
  pageTypeSlug: "module",
  slug: "live-version",
  definition: "the response a running site answers with when asked which commit it is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The answer is never cached.",
    },
    {
      invariantKind: "departure",
      statement: "A build carrying no commit answers with the reason rather than with nothing.",
    },
  ],
} as const satisfies Module
