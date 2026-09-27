import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionWeaponsAfterChange = {
  id: "01a0e2a9-645d-7a53-ae45-27145228aef8",
  type: "page-type/module",
  slug: "companion-weapons-after-change",
  definition: "a companion's weapon slots after one slot's type, trait or quality changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A two-handed main hand empties the off hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A one-handed main hand is copied to an empty off hand.",
    },
  ],
} as const satisfies Module
