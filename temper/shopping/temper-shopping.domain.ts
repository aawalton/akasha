import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperShopping = {
  id: "01a060cf-b0ae-749c-8084-93aa1e9a4247",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-shopping",
  definition: "which guild trader listings to buy and how few kiosks that takes",
  parts: [
    "module/companion-gear-shopping-bridge",
    "module/shopping-settings",
    "module/ttc-budget-strategy",
    "module/ttc-quality-text-classes",
    "module/ttc-shopping-optimizer",
    "module/ttc-shopping-types",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A plan here names the listings to buy rather than buying anything.",
    },
    {
      invariantKind: "departure",
      statement: "A listing at an already chosen kiosk wins a tie on price.",
    },
    {
      invariantKind: "departure",
      statement: "A budget ceiling rises as the market for an item thins.",
    },
    {
      invariantKind: "absence",
      statement: "No price here is asked of the game.",
    },
  ],
} as const satisfies Domain
