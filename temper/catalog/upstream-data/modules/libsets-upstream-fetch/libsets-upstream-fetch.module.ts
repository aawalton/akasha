import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libsetsUpstreamFetch = {
  id: "01a06341-d9e8-7000-b612-9ac2472fbb2d",
  type: "page-type/module",
  slug: "libsets-upstream-fetch",
  definition: "the checkout of pinned upstream LibSets holding this repository's ported set data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout already at the pinned commit is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the pinned commit is fetched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fetch runs at a depth of one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout is read for the files the checkout has before the port runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout is ruled on by the verify module rather than by a second ruling here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the refused folder and the reason the ruling gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every git process is started through the runner.",
    },
  ],
} as const satisfies Module
