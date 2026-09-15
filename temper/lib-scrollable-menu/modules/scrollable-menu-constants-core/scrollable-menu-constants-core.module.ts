import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuConstantsCore = {
  id: "01a06275-c446-7bcd-a095-f1cc9733c1aa",
  type: "module",
  slug: "scrollable-menu-constants-core",
  definition: "the constants the library defines before any other module runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Interface colours are read from the running game at load time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Entry-type numbers are copied onto the library table under their own names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The debug table is created here with the two debug switches off.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The library version is a literal string in the source.",
    },
  ],
} as const satisfies Module
