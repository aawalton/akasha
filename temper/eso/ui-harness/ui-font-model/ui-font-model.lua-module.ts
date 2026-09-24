import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiFontModel = {
  id: "01a0d3ed-29a7-7108-bd79-724f0b06f57c",
  type: "page-type/lua-module",
  slug: "ui-font-model",
  definition: "the game's named fonts, kept as tables outside the game",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A font names itself among the globals, as a font the game declares does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A font answers with its face, its size and its effect when asked for them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name something defines already is left alone rather than made a font.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No glyph is measured, so no text here has a width.",
    },
  ],
} as const satisfies LuaModule
