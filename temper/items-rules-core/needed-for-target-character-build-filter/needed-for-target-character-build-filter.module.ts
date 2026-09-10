import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const neededForTargetCharacterBuildFilter = {
  id: "01a06100-3bf4-7578-bfbf-d81253588245",
  pageTypeSlug: "module",
  slug: "needed-for-target-character-build-filter",
  definition:
    "the Needed for Target Character Build condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `isTargetEquip` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category outside `equipment` is offered no Needed for Target Character Build condition.",
    },
  ],
} as const satisfies Module
