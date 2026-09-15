import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsTipHooks = {
  id: "01a0623c-2df7-7f7d-84bd-015a8c088157",
  type: "module",
  slug: "lib-sets-tip-hooks",
  definition:
    "the wrapping of the game's own tooltip handlers and of other add-ons' tooltip controls",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The game's own handler is wrapped rather than replaced.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "An existing handler on another add-on's control keeps being called before this handler.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Nothing is hooked until the game reports the player active.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Gamepad and keyboard tooltips are hooked by different means.",
    },
  ],
} as const satisfies Module
