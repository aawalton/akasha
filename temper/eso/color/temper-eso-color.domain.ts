import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEsoColor = {
  id: "01a0d3f7-01e0-7b77-82f2-bf4fd5da1870",
  type: "page-type/domain",
  slug: "temper-eso-color",
  definition: "the colors the game's engine gives its interface",
  parts: [
    "data-table/engine-colors",
    "module/engine-colors-reading",
    "module/engine-colors-seeding",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's documentation names a color's type and field and gives no color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color is read out of the running game rather than out of a document.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A later version of the game replaces these colors rather than adding to them.",
    },
  ],
} as const satisfies Domain
