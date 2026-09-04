import type { Module } from "@akasha/code-system/module"

export const addonKeybindsMenuEntry = {
  id: "01a0605a-051a-7771-b0b3-49c682c49d2b",
  pageTypeSlug: "module",
  slug: "addon-keybinds-menu-entry",
  definition: "the second controls panel the game menu gains for addon keybinds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The new panel takes the next free panel id the game menu holds.",
    },
    {
      invariantKind: "departure",
      statement: "The standard panel and the addon panel keep separate scroll positions.",
    },
    {
      invariantKind: "departure",
      statement: "Choosing the new panel puts the game's keybindings fragment up.",
    },
    {
      invariantKind: "departure",
      statement: "Leaving the new panel takes that fragment away.",
    },
    {
      invariantKind: "departure",
      statement: "Resetting the menu tree leaves the panel as though unselected.",
    },
  ],
} as const satisfies Module
