import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiControlModel = {
  id: "01a0c97a-416c-7609-a8c1-5767be94f369",
  type: "page-type/lua-module",
  slug: "ui-control-model",
  definition: "the controls an addon creates, kept as tables outside the game",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A control names itself among the globals, as a control the game makes does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second control taking a name another control holds raises an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name holding the parent placeholder is named with the parent's own name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control keeps the anchors that control was given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control hidden by a forebear reads as hidden.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handler a control is given is kept rather than run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller outside the sandbox runs a handler by naming the control and the event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A snapshot carries the controls under one control as a tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name read off a control starting with a capital is read as a method.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A method the model lacks is counted and answers with the control, so one load finds them all.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No control here has a place on screen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No virtual a control is made from is resolved.",
    },
  ],
} as const satisfies LuaModule
