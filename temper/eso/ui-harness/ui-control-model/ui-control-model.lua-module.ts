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
      decisionKind: "decision-kind/departure",
      statement: "A snapshot carries the colours and the insets a control was given.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No control here has a place on screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control made from a template takes the template's own size, color and anchors.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control made from a template is given the controls that template declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A template an anchor names is looked for under the name the parent resolves it to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control made from a template no caller handed in is a control with nothing on it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "What each alignment is numbered is settled here rather than read from the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control the game makes that an addon extends is made here under the screen.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Which controls those are is a list kept here rather than read from the game.",
    },
  ],
} as const satisfies LuaModule
