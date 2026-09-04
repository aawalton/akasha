import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperItemsFiltersAddon = {
  id: "01a0614b-6734-767e-be82-2cfd13e1d6a8",
  pageTypeSlug: "workspace-package",
  slug: "temper-items-filters-addon",
  definition:
    "the filter panel a player narrows the inventory with, and the binding that narrows the rows",
  manifest: "json",
  partSlugs: ["module/filter-bar", "module/filter-bar-controls", "module/panel-filter-binding"],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The filters offered here are the ones registered in `temper-items-filters-core`.",
    },
    {
      invariantKind: "departure",
      statement: "The panel remembers the position the player dragged the window to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether an item passes a filter.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an item off the guild trader.",
    },
  ],
} as const satisfies WorkspacePackage
