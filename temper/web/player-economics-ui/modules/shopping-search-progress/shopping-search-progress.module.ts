import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingSearchProgress = {
  id: "01a0e2a8-fbc3-7ba2-8b6c-96af28c8da83",
  type: "page-type/module",
  slug: "shopping-search-progress",
  definition: "how far a search for shopping listings has got, and why it stopped if it failed",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The progress wording is read from a phrase page rather than written in its code.",
    },
  ],
} as const satisfies Module
