import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEsoUiHarness = {
  id: "01a0c977-ed0f-7969-a841-8e503fdcfb0b",
  type: "page-type/domain",
  slug: "temper-eso-ui-harness",
  definition: "an addon's interface built and driven outside the game",
  parts: [
    "lua-module/ui-control-model",
    "lua-module/ui-event-model",
    "module/ui-harness",
    "module/ui-layout",
    "module/ui-picture",
    "module/ui-virtuals",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The interface is built by the addon's own shipped Lua.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control the addon creates is a table kept here rather than a stub.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws.",
    },
  ],
} as const satisfies Domain
