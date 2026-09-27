import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoMarkupText = {
  id: "01a0e157-1cce-78d5-b867-717faa29b3e0",
  type: "page-type/module",
  slug: "eso-markup-text",
  definition: "text the game marks up, drawn in a browser as the words and colors it names",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The text is drawn as the pieces `eso-markup` splits it into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A colored piece is drawn in the color the game names for it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No icon the markup names is drawn.",
    },
  ],
} as const satisfies Module
