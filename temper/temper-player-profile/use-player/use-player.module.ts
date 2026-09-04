import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const usePlayer = {
  id: "01a06354-4b4b-79cd-a3ce-5867c52ff199",
  pageTypeSlug: "module",
  slug: "use-player",
  definition: "the signed-in player's row, read and written",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A player row is keyed by the user id its title holds.",
    },
    {
      invariantKind: "departure",
      statement: "A player with no row yet is written by upsert rather than patch.",
    },
    {
      invariantKind: "absence",
      statement: "Profile metadata a player never set holds no key.",
    },
  ],
} as const satisfies Module
