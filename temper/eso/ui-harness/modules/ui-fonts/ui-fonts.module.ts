import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiFonts = {
  id: "01a0d3ec-dd52-7024-bec9-4710e1b52401",
  type: "page-type/module",
  slug: "ui-fonts",
  definition: "the fonts the game's documents declare, each with its face, size and effect",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A font is read from the game's font documents rather than stated here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word a font names in a placeholder is read from the game's font strings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The font strings read are the western ones, which an English client loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A font's size is a number, and a size that will not read as one is zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A document the clone does not hold is passed over rather than refusing the read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A face's advances and line are read from its own OpenType tables, with no package between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A face's line is its ascender less its descender, with its line gap added, in its own units.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face is known by its file's name, lowercased and without its extension.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding no faces answers none rather than refusing the read.",
    },
  ],
} as const satisfies Module
