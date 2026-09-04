import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const requiredCurseStateFilterTypes = {
  id: "01a060d9-44cb-78f1-8dc5-2403ee402ba2",
  pageTypeSlug: "module",
  slug: "required-curse-state-filter-types",
  definition: "the shape of the condition asking that a character be a vampire or a werewolf",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Vampirism and lycanthropy are the two curses this condition asks after.",
    },
  ],
} as const satisfies Module
