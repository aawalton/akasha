import type { Module } from "@akasha/code-system/module"

export const answerPageWrite = {
  id: "01a0640f-8510-7ab5-87bf-f593cb1eb7a7",
  pageTypeSlug: "module",
  slug: "answer-page-write",
  definition: "a page write asked for over http, run and answered",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A writer who is not signed in is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A write is recorded against the name the caller writes as.",
    },
    {
      invariantKind: "departure",
      statement: "The name a site writes as is stated once, at the site's first write.",
    },
    {
      invariantKind: "departure",
      statement: "A write that throws is answered as a bad request rather than as a failure.",
    },
  ],
} as const satisfies Module
