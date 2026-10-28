import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperItemsFiltersAddon = {
  id: "01a0614b-6734-767e-be82-2cfd13e1d6a8",
  type: "page-type/domain",
  slug: "temper-items-filters-addon",
  definition:
    "the filter panel a player narrows the inventory with, and the binding that narrows the rows",
  parts: ["module/filter-bar", "module/filter-bar-controls", "module/panel-filter-binding"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The filters offered here are the ones registered in `temper-items-filters-core`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panel is placed beside the inventory window rather than where a drag left it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides whether an item passes a filter.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads an item off the guild trader.",
    },
  ],
  createdAt: "2026-09-02T08:45:26.708Z",
  updatedAt: "2026-10-28T15:49:51.199Z",
} as const satisfies Domain
