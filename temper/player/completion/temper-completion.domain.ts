import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCompletion = {
  id: "01a0607a-9cbb-77f0-9ede-8b04b4408831",
  type: "page-type/domain",
  slug: "temper-completion",
  definition: "what a player has finished across an account, a character and a companion",
  parts: [
    "module/completion-progress",
    "module/completion-record",
    "module/lore-library-types",
    "module/recipe-types",
    "domain/temper-player-completion",
    "module/held-lore-library",
    "module/held-lore-library-loading",
    "module/lore-library-pages",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The lore library is read from the lore pages, and no table in code holds it.",
    },
  ],
  createdAt: "2026-09-02T04:57:23.387Z",
  updatedAt: "2026-09-27T10:46:43.000Z",
} as const satisfies Domain
