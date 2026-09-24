import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiAnimationModel = {
  id: "01a0d3f1-bbdc-7e3a-bd05-508c67c93014",
  type: "page-type/lua-module",
  slug: "ui-animation-model",
  definition: "the game's animation timelines, kept as tables outside the game",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline played finishes at once, because no clock runs here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A timeline finishing tells the handler it was given for stopping, as a finished one does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline played forward ends at its end, and one played backward at its start.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No animation changes a control, so a control shows as its last setting left it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No animation template a document declares is read, so a timeline starts empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's getter for the animation manager answers this model's.",
    },
  ],
} as const satisfies LuaModule
