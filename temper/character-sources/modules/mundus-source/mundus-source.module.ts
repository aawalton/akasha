import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const mundusSource = {
  id: "01a061a7-9bb1-778e-b38f-f397e2f754ea",
  type: "module",
  slug: "mundus-source",
  definition: "the boon each mundus stone gives a character, and what divines armor adds",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A mundus stone's place in this table is the index a build hash has.",
    },
    {
      invariantKind: "gap",
      statement: "A mundus stone moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
