import type { Module } from "../../code-system/modules/module.page-type.ts"

export const procEnviron = {
  id: "01a0691b-4f63-79be-84d6-4d9546e6c1be",
  pageTypeSlug: "module",
  slug: "proc-environ",
  definition: "one environment variable read off one process by its pid",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process whose environ will not open answers null rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "The value is split off the environ the way proc-reading splits that environ.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows an environment variable's meaning.",
    },
  ],
} as const satisfies Module
