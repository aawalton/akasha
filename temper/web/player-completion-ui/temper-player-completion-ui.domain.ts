import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperPlayerCompletionUi = {
  id: "01a06267-372c-7003-8a9e-15b2f42d8750",
  type: "page-type/domain",
  slug: "temper-player-completion-ui",
  definition: "the panel drawing a player's completion in a browser",
  parts: [
    "module/completion-activity-mode-context",
    "module/completion-panel-card",
    "module/completion-search-context",
    "module/use-completion",
    "module/completion-category-badges",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A panel here reaches no data of its own.",
    },
  ],
  createdAt: "2026-09-02T13:55:26.636Z",
  updatedAt: "2026-09-27T12:19:11.000Z",
} as const satisfies Domain
