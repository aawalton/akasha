import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const temperProgress = {
  id: "01a05fac-7582-726f-ac10-d5261c7e1f65",
  pageTypeSlug: "domain",
  slug: "temper-progress",
  definition: "what has been done in the game and what is left",
  pluralSlug: "temper-progressions",
  partSlugs: [
    "page-type/temper-activity-category",
    "page-type/temper-comparison-op",
    "page-type/temper-completed-day",
    "page-type/temper-completion-category",
    "page-type/temper-completion-override",
    "page-type/temper-metric-tree",
    "page-type/temper-progress-thing",
    "page-type/temper-rotation-breakdown-row",
    "page-type/temper-rule-template",
    "page-type/temper-task",
    "page-type/temper-watcher-enrolment",
    "readout/inboxes-temper-tasks",
  ],
} as const satisfies Domain
