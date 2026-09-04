import type { Module } from "@akasha/code-system/module"

export const companionsEntry = {
  id: "01a0611d-84d4-78d0-bf13-a155e200451a",
  pageTypeSlug: "module",
  slug: "companions-entry",
  definition: "what the companion add-on does as the game loads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The companion tab is registered with the characters add-on rather than drawn alone.",
    },
  ],
} as const satisfies Module
