import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEsoReturn = {
  id: "01a0d3c5-26b3-7e9b-a4cc-6e4b1be2fbe7",
  type: "page-type/domain",
  slug: "temper-eso-return",
  definition: "what the game's documentation says a function gives back",
  parts: [
    "data-table/engine-returns",
    "module/engine-returns-reading",
    "module/engine-returns-seeding",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A function the engine holds is absent where the game is not running the code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function nothing here implements gives back the kind of value the documentation names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The documentation names the kind of every return and the value of none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind is written as the emptiest value of that kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The documentation is read once into akasha rather than at every run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function something here implements keeps what that implementation gives back.",
    },
  ],
} as const satisfies Domain
