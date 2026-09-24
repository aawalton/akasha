import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEsoString = {
  id: "01a0d417-0c97-720e-8c62-96038b6b3ee6",
  type: "page-type/domain",
  slug: "temper-eso-string",
  definition: "the text the game gives each of its interface strings",
  parts: [
    "data-table/engine-strings",
    "module/engine-strings-reading",
    "module/engine-strings-seeding",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game publishes each string's name and number and none of its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string's text is read out of the running game rather than out of a document.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The text is the English the client the capture ran in gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A later version of the game replaces this text rather than adding to it.",
    },
  ],
} as const satisfies Domain
