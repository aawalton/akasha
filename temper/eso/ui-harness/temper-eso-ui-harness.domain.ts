import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEsoUiHarness = {
  id: "01a0c977-ed0f-7969-a841-8e503fdcfb0b",
  type: "page-type/domain",
  slug: "temper-eso-ui-harness",
  definition: "an addon's interface built and driven outside the game",
  parts: [
    "module/game-manifest",
    "lua-module/ui-place-model",
    "lua-module/ui-control-model",
    "lua-module/ui-control-methods",
    "lua-module/ui-control-snapshot",
    "lua-module/ui-font-model",
    "lua-module/ui-animation-model",
    "lua-module/ui-currency-model",
    "module/ui-fonts",
    "lua-module/ui-event-model",
    "lua-module/ui-scene-model",
    "lua-module/ui-text-model",
    "module/ui-harness",
    "module/ui-inheritance",
    "module/ui-picture",
    "module/ui-staging",
    "module/ui-timelines",
    "module/ui-virtuals",
    "module/ui-windows",
    "module/game-names",
    "lua-module/ui-addon-model",
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
      decisionKind: "decision-kind/departure",
      statement: "A picture here is worked out from the controls rather than rendered by the game.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's matrix and scene-graph Lua declares typed structures, so never loads.",
    },
  ],
} as const satisfies Domain
