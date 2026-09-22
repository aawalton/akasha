import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperBuildSupport = {
  id: "01a0609f-53f7-7460-afb2-168bb75adada",
  type: "page-type/domain",
  slug: "temper-build-support",
  definition: "what handles both a character build and a companion build",
  parts: [
    "module/automation-settings",
    "module/build-row",
    "module/build-url",
    "module/build-visibility",
    "module/confirm-set-target",
    "module/eso-name",
    "module/import-redirect",
    "module/row-grouping",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character build and a companion build are handled alike wherever the two agree.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No build is worked out here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Domain
