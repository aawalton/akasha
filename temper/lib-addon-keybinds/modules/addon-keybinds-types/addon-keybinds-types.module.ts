import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonKeybindsTypes = {
  id: "01a0605a-051c-71ee-b5b4-2aa2ec58d9e0",
  type: "page-type/module",
  slug: "addon-keybinds-types",
  definition: "the shape of the library global and of a row in the game's keybinding list",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which half of the split is chosen is one flag on the library global.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row has a type number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keybind row also has the name of the action bound.",
    },
  ],
} as const satisfies Module
