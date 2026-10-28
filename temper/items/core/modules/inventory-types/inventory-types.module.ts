import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTypes = {
  id: "01a060c5-3c23-76ec-aa93-fa279ae67a96",
  type: "page-type/module",
  slug: "inventory-types",
  definition: "what an inventory has and the item numbers the game gives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Temper Items compiles this module into the game, which holds no zod.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The zod shape of an inventory is held in `inventory-database-shape`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item carries the game's junk state as `junk` and `junkable`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture taken before a field was recorded leaves that field off the item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item carries what the addon last resolved it to as four flat fields.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Those four are `resolvedAction`, `resolvedDestination`, `resolvedBy`, `resolvedRuleIndex`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item the addon's rules have not walked carries none of the four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`resolvedRuleIndex` is there only where `resolvedBy` is `ordered-rule`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`resolvedBy` names the route that resolved the item where no index names a rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crafted item carries `craftedAt`, the second the addon first saw it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A `craftedAt` of `CRAFTED_BEFORE_THE_STAMP` says the item was held before any stamp.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crafted item carries `dailyWritNeeded`, whether a daily writ held asks for it.",
    },
  ],
  createdAt: "2026-09-02T06:18:53.859Z",
  updatedAt: "2026-10-28T18:35:47.017Z",
} as const satisfies Module
