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
      statement: "Raising an event runs every callback waiting on that event, in the order taken.",
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
  ],
} as const satisfies LuaModule
