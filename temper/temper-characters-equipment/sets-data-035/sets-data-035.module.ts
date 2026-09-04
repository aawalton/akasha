import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData035 = {
  id: "01a061a3-0131-708a-a170-4ee583927a5a",
  pageTypeSlug: "module",
  slug: "sets-data-035",
  definition: "part 035 of the gear set table, frozen-watcher through gaze-of-sithis",
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
