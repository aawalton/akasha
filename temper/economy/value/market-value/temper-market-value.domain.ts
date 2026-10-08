import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperMarketValue = {
  id: "01a0b761-39a1-739d-9548-59355a694035",
  type: "page-type/domain",
  slug: "temper-market-value",
  definition: "what another player would pay for a thing",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A market value is worked out from what Tamriel Trade Centre last saw a thing sell for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing no player can be sold has no market value.",
    },
  ],
  createdAt: "2026-09-19T01:56:37.409Z",
  updatedAt: "2026-09-21T15:10:37.000Z",
} as const satisfies Domain
