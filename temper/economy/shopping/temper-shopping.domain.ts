import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperShopping = {
  id: "01a060cf-b0ae-749c-8084-93aa1e9a4247",
  type: "page-type/domain",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan here names the listings to buy rather than buying anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing at an already chosen kiosk wins a tie on price.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A budget ceiling rises as the market for an item thins.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No price here is asked of the game.",
    },
  ],
  createdAt: "2026-09-02T06:30:19.054Z",
  updatedAt: "2026-09-21T15:10:37.000Z",
} as const satisfies Domain
