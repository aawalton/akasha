import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingUpstreamVerify = {
  id: "01a06282-dfc3-7813-b3f1-ca3f89826794",
  type: "module",
  slug: "housing-upstream-verify",
  definition: "the ruling on whether the ported PortToFriendsHouse data still matches upstream",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The European list is ruled on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The North American list is ruled on.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A list is carried out of Lua before that list is walked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The upstream file is handed the filter constants that file reads while loading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The upstream file is handed a world name while loading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The European list is built by calling the upstream builder for Europe.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The North American list is built by calling the upstream builder for that region.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The Lua machine is closed once the ruling settles.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
} as const satisfies Module
