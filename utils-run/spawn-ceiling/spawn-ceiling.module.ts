import type { Module } from "../../code-system/modules/module.page-type.ts"

export const spawnCeiling = {
  id: "01a068d4-d2aa-7e7a-b2d7-205870b2e2b4",
  pageTypeSlug: "module",
  slug: "spawn-ceiling",
  definition: "waiting on a child process no longer than a ceiling",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process reaching the ceiling is killed before the wait is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the process and the ceiling it ran past.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for the ceiling is told apart from any other by its own name.",
    },
  ],
} as const satisfies Module
