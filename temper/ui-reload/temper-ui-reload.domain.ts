import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperUiReload = {
  id: "01a090b2-5f8d-7d96-a9d1-8ee2121b1662",
  type: "domain",
  slug: "temper-ui-reload",
  definition: "the game loading its interface again",
  parts: ["module/reload-ui"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The interface loads again without the player leaving the world.",
    },
  ],
} as const satisfies Domain
