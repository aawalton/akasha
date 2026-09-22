import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiTextModel = {
  id: "01a0c9f5-7be6-7247-880c-a8fde9d42eb2",
  type: "page-type/lua-module",
  slug: "ui-text-model",
  definition: "the sentence the game builds out of a format and what fills it",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot in a format is filled with the value at the number that slot ends in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot carrying a grammar letter is filled as a slot carrying none is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot with nothing to fill it is left empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A format that is no words is answered with no words.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No grammar the game applies to a filled slot is applied here.",
    },
  ],
} as const satisfies LuaModule
