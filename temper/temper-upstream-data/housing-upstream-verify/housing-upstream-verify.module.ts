import type { Module } from "@akasha/code-system/module"

export const housingUpstreamVerify = {
  id: "01a06282-dfc3-7813-b3f1-ca3f89826794",
  pageTypeSlug: "module",
  slug: "housing-upstream-verify",
  definition: "the ruling on whether the ported PortToFriendsHouse data still matches upstream",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The European list is ruled on.",
    },
    {
      invariantKind: "departure",
      statement: "The North American list is ruled on.",
    },
    {
      invariantKind: "constraint",
      statement: "A list is carried out of Lua before that list is walked.",
    },
    {
      invariantKind: "departure",
      statement: "The upstream file is handed the filter constants that file reads while loading.",
    },
    {
      invariantKind: "departure",
      statement: "The upstream file is handed a world name while loading.",
    },
    {
      invariantKind: "departure",
      statement: "The European list is built by calling the upstream builder for Europe.",
    },
    {
      invariantKind: "departure",
      statement:
        "The North American list is built by calling the upstream builder for that region.",
    },
    {
      invariantKind: "departure",
      statement: "The Lua machine is closed once the ruling settles.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
} as const satisfies Module
