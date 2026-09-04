import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionAntiquityLoreProgress = {
  id: "01a06358-4f7c-77e7-a32e-20a4046028cd",
  pageTypeSlug: "module",
  slug: "completion-antiquity-lore-progress",
  definition: "how much antiquity lore an account has dug up, category by category",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The antiquity catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record entry carrying a name is read for the acquired lore entries the entry states.",
    },
    {
      invariantKind: "departure",
      statement: "A record entry that is a bare number is that many lore entries acquired.",
    },
    {
      invariantKind: "departure",
      statement: "An antiquity the record says nothing about has no lore entries acquired.",
    },
    {
      invariantKind: "departure",
      statement: "How many lore entries an antiquity holds is taken from the catalog.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty catalog answers an empty progress.",
    },
  ],
} as const satisfies Module
