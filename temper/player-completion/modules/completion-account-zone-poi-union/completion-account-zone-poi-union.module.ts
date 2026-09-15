import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAccountZonePoiUnion = {
  id: "01a06358-4f7c-7797-8df7-6ca950b9bf86",
  type: "module",
  slug: "completion-account-zone-poi-union",
  definition: "what any one character of an account has finished out in the world",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A place one character found counts as found for the account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An activity one character finished counts as finished for the account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The zone catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The zone completion roll-up takes its shape from the first character given.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An empty list of characters answers an empty progress.",
    },
  ],
} as const satisfies Module
