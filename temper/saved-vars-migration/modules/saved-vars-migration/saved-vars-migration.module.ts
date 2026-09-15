import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const savedVarsMigration = {
  id: "01a06072-5abc-78bd-a40d-4a0c330f4651",
  type: "module",
  slug: "saved-vars-migration",
  definition: "a player's saved variables carried to the file the folded-together addon reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A migration names the one addon that migration runs for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rename writes the new file and leaves the old file alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rename whose new file is already there is skipped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rename matching no global writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An append copies the target aside before writing the target.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An append whose target is absent is skipped rather than made.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs a whole list of migrations.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says what a migration did.",
    },
  ],
} as const satisfies Module
