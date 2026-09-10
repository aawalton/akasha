import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData062 = {
  id: "01a061a3-3082-70bf-b9cf-f310fc6924b1",
  pageTypeSlug: "module",
  slug: "sets-data-062",
  definition: "part 062 of the gear set table, night-terror through nix-hounds-howl",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
    {
      invariantKind: "gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
