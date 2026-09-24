import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiCurrencyModel = {
  id: "01a0d412-c83f-74bd-9db1-eb747df13e53",
  type: "page-type/lua-module",
  slug: "ui-currency-model",
  definition: "which of the game's currencies each of its market currencies is",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A market currency is the currency the game's constants name the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pairs are worked out from the captured constants rather than listed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A market currency no currency is named for answers the game's word for none.",
    },
  ],
} as const satisfies LuaModule
