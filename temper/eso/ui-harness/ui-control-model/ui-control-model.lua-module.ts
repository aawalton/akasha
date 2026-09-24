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
      statement:
        "The game's getter for the window manager answers this model's, so the game's own Lua assigns it.",
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
      statement: "A name holding the grandparent placeholder is named with the parent's parent's.",
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
      statement:
        "A snapshot carries the colors, the insets and the edge texture a control was given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color given as anything but numbers leaves the control without a color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A size, an alpha, a scale or an offset is taken only as a finite number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text, a font and a texture are kept only where the game handed over words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The width a control answers with is the width where that control sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a control sits is worked out by the model loaded before this one.",
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
      decisionKind: "decision-kind/departure",
      statement:
        "What a constant is numbered is read from the game's capture rather than settled here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control made from a template keeps every handler that template writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The handler for being made is run once the control's own controls are there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handler for being made that raises leaves the control as that handler left it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What such a handler raised is kept under the control's name, so one load finds them all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is kept carries the trace, because the raise is deep in the game's own Lua.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A template applied to a control made already dresses that control as being made would.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control the game makes that an addon extends is made here under the screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window an addon opens sits under the screen, so one snapshot carries the scene.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Which controls those are is a list kept here rather than read from the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window the game declares is built under the screen where a caller names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name another control holds already is left alone rather than built twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller shows a control the game declares hidden by naming that control.",
    },
  ],
} as const satisfies LuaModule
