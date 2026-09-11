import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const setsData049 = {
  id: "01a061a3-307f-79a2-9c75-f6d88c5b9ea1",
  type: "module",
  slug: "sets-data-049",
  definition: "part 049 of the gear set table, kazpians-cruel-signet through knightmare",
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
