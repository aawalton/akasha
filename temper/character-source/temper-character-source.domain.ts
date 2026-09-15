import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCharacterSource = {
  id: "01a060ea-ac66-7120-a995-b58614b651f2",
  type: "page-type/domain",
  slug: "temper-character-source",
  definition:
    "the effect sources a character build carries beyond its class, race, gear and skills",
  parts: [
    "module/alliances",
    "module/attributes-source",
    "module/base-source",
    "module/character-roles",
    "module/curse-source",
    "module/curses",
    "module/drink-source",
    "module/eso-plus-source",
    "module/food-or-drink-source",
    "module/food-source",
    "module/mundus-source",
    "module/target-armors",
    "module/target-source",
    "module/vampire-stages",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's class and race are named outside this folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's gear is named outside this folder.",
    },
  ],
} as const satisfies Domain
