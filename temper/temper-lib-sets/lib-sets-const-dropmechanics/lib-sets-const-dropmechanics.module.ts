import type { Module } from "@akasha/code-system/module"

export const libSetsConstDropmechanics = {
  id: "01a061d6-3e22-7cb9-b1f5-2605e32ae7a6",
  pageTypeSlug: "module",
  slug: "lib-sets-const-dropmechanics",
  definition: "the forty ways a gear set can drop, each given a number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Each drop mechanic name is declared as a game global rather than a member of a table.",
    },
    {
      invariantKind: "departure",
      statement: "The library declares zone ids the game does not have.",
    },
  ],
} as const satisfies Module
