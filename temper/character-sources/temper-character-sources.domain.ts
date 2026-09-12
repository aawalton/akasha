import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperCharacterSources = {
  id: "01a060ea-ac66-7120-a995-b58614b651f2",
  type: "domain",
  slug: "temper-character-sources",
  definition:
    "the effect sources a character build carries beyond its class, race, gear and skills",
  parts: [
    "module/alliances",
    "module/attributes-source",
    "module/base-source",
    "module/character-roles",
    "module/curse-source",
    "module/curses",
    "module/eso-plus-source",
    "module/food-source",
    "module/target-armors",
    "module/drink-source",
    "module/food-or-drink-source",
    "module/mundus-source",
    "module/target-source",
    "module/vampire-stages",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character's class and race are named outside this folder.",
    },
    {
      invariantKind: "departure",
      statement: "A character's gear is named outside this folder.",
    },
  ],
} as const satisfies Domain
