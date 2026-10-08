import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemTooltipPopover = {
  id: "01a0636c-5d9b-7fc6-b673-e0db8f050034",
  type: "page-type/module",
  slug: "item-tooltip-popover",
  definition: "the popover drawing an item's tooltip",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The popover's loading, missing-detail notes and trigger label are web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:46:02.000Z",
} as const satisfies Module
