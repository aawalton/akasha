import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiTextModel = {
  id: "01a0c9f5-7be6-7247-880c-a8fde9d42eb2",
  type: "page-type/lua-module",
  slug: "ui-text-model",
  definition: "what the game's engine does to text",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's own Lua sets the string library's case changes to the engine's, which answer empty here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The engine's case changes answer as the string library's own do.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A letter outside plain English keeps its case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The engine's plain search and split answer as the game documents them.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's own Lua keys a cached format by the engine's hash of the text given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two different texts hash to two different numbers, as the engine's do.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The hash is a plain string hash rather than the engine's own.",
    },
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
      decisionKind: "decision-kind/departure",
      statement: "The format an addon calls and the one the game builds are the same thing here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No grammar the game applies to a filled slot is applied here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No sentence is kept from one call to the next.",
    },
  ],
} as const satisfies LuaModule
