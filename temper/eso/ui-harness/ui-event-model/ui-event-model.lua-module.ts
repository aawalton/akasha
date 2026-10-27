import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiEventModel = {
  id: "01a0c98b-f0fa-7635-957c-f4b8fc656fe0",
  type: "page-type/lua-module",
  slug: "ui-event-model",
  definition: "the events an addon waits on, kept outside the game so a caller can raise them",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An event is keyed by the value the addon named rather than by a spelling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Waiting on an event the game does not have takes nothing and answers false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control waits on an event as the event manager does, under the control itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game's getter for the event manager answers this model's, so the game's own Lua assigns it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Raising an event runs every callback waiting on that event, in the order taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A callback that starts waiting during a raise is first reached by the next raise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Waiting on an event already waited on under the same name takes nothing and answers false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A callback that throws is run past, and the first throw is raised once all ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Work put off to later waits until a caller settles it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game puts work off to later by asking for an update that runs once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An update asked to run once is work put off to later.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settling runs work put off while settling, up to a stated number of passes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No filter an addon states narrows which callbacks a raise reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No clock runs, so work waiting on an interval runs only when a caller says.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game puts a list's rows off to the next frame while the list has no height.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each round of settling ends in one frame, which runs every shown control's update.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An update that throws in a frame is run past, as the game runs past it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every error run past is kept, once each, so a caller can name it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each round of settling then compares every shown control's rect with the last seen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control not seen before was last seen with no rect at the screen's corner.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control whose rect changed is told so, with its new and its old edges.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control whose width or height changed is told of that measure too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control growing to fit whose size changed is told it was resized to fit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settling goes on while a rect changed, so a handler moving a control is seen.",
    },
  ],
  createdAt: "2026-09-22T14:36:26.746Z",
  updatedAt: "2026-10-27T19:11:25.299Z",
} as const satisfies LuaModule
