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
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's own Lua plays a timeline before it has finished building what stops it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The handler for stopping waits with the other calls made for later.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handler for stopping taken away while it waits is not called.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's own Lua gives an animation in a timeline a handler of its own for stopping.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each animation's handler for stopping is told before the timeline's, with its control.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline played forward ends at its end, and one played backward at its start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline finishing hands each animation's update function where it ended.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No animation changes a control, so a control shows as its last setting left it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A timeline made from one a document declares holds an animation of each kind declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each animation of such a timeline is on the control the timeline was made for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline made from one no document declares starts empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline made from one a document declares holds each timeline nested in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's getter for the animation manager answers this model's.",
    },
  ],
  createdAt: "2026-09-24T15:03:49.980Z",
  updatedAt: "2026-10-27T19:21:21.813Z",
} as const satisfies LuaModule
