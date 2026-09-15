import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTypes = {
  id: "01a060c5-3c23-76ec-aa93-fa279ae67a96",
  type: "module",
  slug: "inventory-types",
  definition: "what an inventory has and the item numbers the game gives",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item carries the game's junk state as `junk` and `junkable`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture taken before a field was recorded leaves that field off the item.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item carries what the addon last resolved it to as four flat fields.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Those four are `resolvedAction`, `resolvedDestination`, `resolvedBy`, `resolvedRuleIndex`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item the addon's rules have not walked carries none of the four.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`resolvedRuleIndex` is there only where `resolvedBy` is `ordered-rule`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`resolvedBy` names the route that resolved the item where no index names a rule.",
    },
  ],
} as const satisfies Module
