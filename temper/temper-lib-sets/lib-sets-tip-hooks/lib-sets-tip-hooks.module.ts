import type { Module } from "@akasha/code-system/module"

export const libSetsTipHooks = {
  id: "01a0623c-2df7-7f7d-84bd-015a8c088157",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-hooks",
  definition:
    "the wrapping of the game's own tooltip handlers and of other add-ons' tooltip controls",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game's own handler is wrapped rather than replaced.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An existing handler on another add-on's control keeps being called before this one.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing is hooked until the game reports the player active.",
    },
    {
      invariantKind: "departure",
      statement: "Gamepad and keyboard tooltips are hooked by different means.",
    },
  ],
} as const satisfies Module
