import type { Module } from "@akasha/code-system/module"

export const libsetsUpstreamFetch = {
  id: "01a06341-d9e8-7000-b612-9ac2472fbb2d",
  pageTypeSlug: "module",
  slug: "libsets-upstream-fetch",
  definition: "the checkout of pinned upstream LibSets this repository ports its set data out of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout already at the pinned commit is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Only the pinned commit is fetched.",
    },
    {
      invariantKind: "departure",
      statement: "A fetch runs at a depth of one commit.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout is read for what the checkout holds before the port runs.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout is ruled on by the verify module rather than by a second ruling here.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the refused folder and what the ruling said.",
    },
    {
      invariantKind: "departure",
      statement: "Every git process is started through the runner.",
    },
  ],
} as const satisfies Module
