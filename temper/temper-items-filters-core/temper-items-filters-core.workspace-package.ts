import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperItemsFiltersCore = {
  id: "01a0613a-e0b3-78d9-aaac-decd150b1b76",
  pageTypeSlug: "workspace-package",
  slug: "temper-items-filters-core",
  definition:
    "the filters a player narrows an item search with, and how a saved search keeps a filter value",
  manifest: "json",
  partSlugs: [
    "module/saved-search",
    "module/search-armor-weight-filter",
    "module/search-bop-tradeable-filter",
    "module/search-bound-filter",
    "module/search-crafted-filter",
    "module/search-equip-slot-filter",
    "module/search-eval-adapter",
    "module/search-filter-registry",
    "module/search-filter-set",
    "module/search-filter-types",
    "module/search-item-name-filter",
    "module/search-item-type-filter",
    "module/search-knowledge-filter",
    "module/search-level-filter",
    "module/search-locked-filter",
    "module/search-market-value-filter",
    "module/search-merchant-value-filter",
    "module/search-potion-effects-filter",
    "module/search-quality-filter",
    "module/search-range-value-parse",
    "module/search-recipe-subtype-filter",
    "module/search-reconstructed-filter",
    "module/search-server-narrowing",
    "module/search-set-filter",
    "module/search-stack-fullness-filter",
    "module/search-stolen-filter",
    "module/search-string-array-parse",
    "module/search-style-page-filter",
    "module/search-survey-filter",
    "module/search-toggle-value-parse",
    "module/search-trait-filter",
    "module/search-transmuted-filter",
    "module/search-treasure-map-filter",
    "module/search-value-filter",
    "module/search-weapon-type-filter",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A filter narrows the items already in hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A filter that can also narrow the guild-trader request says so with a hook of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each filter reads its own value back out of a saved search rather than trusting the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a filter bar.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The rule-editor filters of the same names are another layer in `temper-items-rules-core`.",
    },
  ],
} as const satisfies WorkspacePackage
