import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiAddonModel = {
  id: "01a0d456-b121-7b52-b7c8-17a41ebd5021",
  type: "page-type/lua-module",
  slug: "ui-addon-model",
  definition: "the game's add-on manager, kept outside the game",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's documentation never names the getter for the add-on manager.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on manager counts no add-on, so a list the game builds of them is empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Add-ons are enabled, as the game that loaded the addon has them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other getter answers zero, and any other method does nothing.",
    },
  ],
} as const satisfies LuaModule
