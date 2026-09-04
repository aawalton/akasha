import type { Module } from "@akasha/code-system/module"

export const addonKeybindsTypes = {
  id: "01a0605a-051c-71ee-b5b4-2aa2ec58d9e0",
  pageTypeSlug: "module",
  slug: "addon-keybinds-types",
  definition: "the shape of the library global and of a row in the game's keybinding list",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which half of the split is chosen is one flag on the library global.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries a type number.",
    },
    {
      invariantKind: "departure",
      statement: "A keybind row also carries the name of the action bound.",
    },
  ],
} as const satisfies Module
