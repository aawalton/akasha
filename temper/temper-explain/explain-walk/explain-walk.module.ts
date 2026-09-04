import type { Module } from "@akasha/code-system/module"

export const explainWalk = {
  id: "01a06036-188c-735e-bae8-be4f3d907a2f",
  pageTypeSlug: "module",
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
      statement: "A field carrying nothing is written as the empty string.",
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
