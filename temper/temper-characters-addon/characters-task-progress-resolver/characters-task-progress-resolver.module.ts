import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersTaskProgressResolver = {
  id: "01a062ee-f0bd-7071-8b01-5c61376d23f5",
  pageTypeSlug: "module",
  slug: "characters-task-progress-resolver",
  definition: "how far one task has got, worked out from the completion card that task names",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Which resolver a completion card is answered by is stated in one place.",
    },
  ],
} as const satisfies Module
