import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCollectiblesProgress = {
  id: "01a06358-4f7c-7028-886d-cc701f3aafab",
  type: "module",
  slug: "completion-collectibles-progress",
  definition: "how many collectibles an account has unlocked, category by category",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The collectible catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A heading and the categories beneath the heading arrive together in one flat list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category naming no parent is a heading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category whose parent names no category in the list is a heading too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A heading carrying collectibles directly gives a subheading named as the heading is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category stating no display order sorts at zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Categories sharing a display order keep the order of arrival.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No collectible category landed today states a display order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A heading stating no category index is reckoned at index zero.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An empty catalog answers an empty progress.",
    },
  ],
} as const satisfies Module
