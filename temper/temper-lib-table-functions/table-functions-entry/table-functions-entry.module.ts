import type { Module } from "@akasha/code-system/module"

export const tableFunctionsEntry = {
  id: "01a06052-2ca6-7783-9f7b-c66a284047c9",
  pageTypeSlug: "module",
  slug: "table-functions-entry",
  definition: "the global the game reads the table helpers from once the addon loads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bundle the transpiler writes starts here.",
    },
    {
      invariantKind: "departure",
      statement: "The global carries the whole library rather than one helper at a time.",
    },
  ],
} as const satisfies Module
