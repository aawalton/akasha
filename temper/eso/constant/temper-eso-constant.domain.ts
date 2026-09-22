import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEsoConstant = {
  id: "01a0cac4-be34-72eb-b6bf-8acc883ca004",
  type: "page-type/domain",
  slug: "temper-eso-constant",
  definition: "the values the game gives the globals an add-on runs among",
  parts: ["data-table/engine-constants"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's own documentation names a constant without saying what it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A constant's value is read out of the running game rather than out of a document.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The values here are what one capture found, rather than what many captures agree on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A later version of the game replaces these values rather than adding to them.",
    },
  ],
} as const satisfies Domain
