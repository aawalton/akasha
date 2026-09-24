import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineColorsSeeding = {
  id: "01a0d3f7-7ba7-7987-9441-90a19bd782cb",
  type: "page-type/module",
  slug: "engine-colors-seeding",
  definition: "the Lua answering the game's color getter in a sandbox from the captured colors",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's color getter answers the captured color for a type and field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type and field the capture holds no color for answers white, fully opaque.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A color of four zeros is drawn as nothing, so text given it could never be seen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The getter is defined among the real globals, so a model or the defaults cannot shadow it.",
    },
  ],
} as const satisfies Module
