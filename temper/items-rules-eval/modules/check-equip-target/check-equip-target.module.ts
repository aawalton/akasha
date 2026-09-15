import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkEquipTarget = {
  id: "01a06137-f964-761e-935e-c18a08cf1dce",
  type: "module",
  slug: "check-equip-target",
  definition:
    "the condition check over whether an item is equipment a character or companion wants",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A missing equipType or traitType or quality makes the condition indeterminate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first missing field of those three is reported as the missing signal.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Character equipment and companion equipment are separate environment lookups.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reports which character wants the equipment.",
    },
  ],
} as const satisfies Module
