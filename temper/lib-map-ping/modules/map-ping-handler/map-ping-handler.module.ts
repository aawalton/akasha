import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPingHandler = {
  id: "01a0605f-6262-7752-a1ba-21ba45c69531",
  type: "module",
  slug: "map-ping-handler",
  definition: "the wrappers around the game's own map ping functions",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wrapper calls the function the wrapper replaced.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The game's own map is unhooked from the ping event.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A suppressed ping reads back as no position.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group ping outside a group is dropped.",
    },
  ],
} as const satisfies Module
