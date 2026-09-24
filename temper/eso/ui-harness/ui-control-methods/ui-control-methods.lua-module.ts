import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiControlMethods = {
  id: "01a0d40c-1f7a-7728-a4c9-f977dcaff8a8",
  type: "page-type/lua-module",
  slug: "ui-control-methods",
  definition: "what a control the sandbox holds is set to and answers with",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A control shown or hidden runs its handlers for being shown or hidden.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Setting a control to the state it is in already runs nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This is loaded after the control model, whose controls it gives methods to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control keeps the anchors that control was given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handler set under a name sits beside the unnamed one for its event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control hidden by a forebear reads as hidden.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's own Lua compares a control's own hidden flag with what it was last set to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control asked whether that control alone is hidden answers its own flag.",
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
      statement: "A control keeps the least and greatest size it was held to, each zero until set.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The least and greatest size a control is held to bound where the control sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a control sits is worked out by the model loaded before this one.",
    },
  ],
} as const satisfies LuaModule
