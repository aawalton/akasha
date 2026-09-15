import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const explainWalk = {
  id: "01a06036-188c-735e-bae8-be4f3d907a2f",
  type: "module",
  slug: "explain-walk",
  definition: "the rules one item was walked through, written out as lines to read",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account here covers one item.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An account names every rule the item met rather than the rule that took the item.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row of the walk is one line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tab parts one field of a row from the next.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field the walk names but carries nothing for is written as the empty string.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The junk the game holds and the junk the game would allow are both written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A junk field the capture never recorded is written `not captured`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An item resolved to sell that the game will not let be marked junk is named at the foot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows keep the order the rules were met in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sell-through rate is worked out here from the counts the pricing states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sell-through rate is worked out from no count the pricing left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sell-through rate is trimmed where the sales outrun the amount counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule whose outcome could still turn is named again at the foot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item rule answering before the ordered rules is the row at index -1.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A walk holding that row is named at the foot as one no category rule was read for.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rule is weighed here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
