import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const explainWalk = {
  id: "01a06036-188c-735e-bae8-be4f3d907a2f",
  type: "module",
  slug: "explain-walk",
  definition: "the rules one item was walked through, written out as lines to read",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row of the walk is one line.",
    },
    {
      invariantKind: "departure",
      statement: "A tab parts one field of a row from the next.",
    },
    {
      invariantKind: "departure",
      statement: "A field the walk names but carries nothing for is written as the empty string.",
    },
    {
      invariantKind: "departure",
      statement: "The junk the game holds and the junk the game would allow are both written.",
    },
    {
      invariantKind: "departure",
      statement: "A junk field the capture never recorded is written `not captured`.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item resolved to sell that the game will not let be marked junk is named at the foot.",
    },
    {
      invariantKind: "departure",
      statement: "The rows keep the order the rules were met in.",
    },
    {
      invariantKind: "departure",
      statement: "A sell-through rate is worked out here from the counts the pricing states.",
    },
    {
      invariantKind: "departure",
      statement: "A sell-through rate is worked out from no count the pricing left out.",
    },
    {
      invariantKind: "departure",
      statement: "A sell-through rate is trimmed where the sales outrun the amount counted.",
    },
    {
      invariantKind: "departure",
      statement: "A rule whose outcome could still turn is named again at the foot.",
    },
    {
      invariantKind: "absence",
      statement: "No rule is weighed here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
