import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiControlSnapshot = {
  id: "01a0d3e8-9e04-71b8-89a6-1178f9be4ba5",
  type: "page-type/lua-module",
  slug: "ui-control-snapshot",
  definition: "a control the sandbox holds, written out as a tree a caller outside can read",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A snapshot carries the controls under one control as a tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Siblings are carried in the order the game draws them: by tier, then layer, then level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Siblings drawn at the same tier, layer and level keep the order they were made in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The windows on the screen are carried in the order they were made.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game brings a window to the top as it is shown, which the harness does not model.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A snapshot carries the colors, the insets and every texture a control was given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A font a control names is carried as that font's face, size and effect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A label's text is carried as the lines it wraps into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A snapshot naming no control is of the screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A snapshot of a name no control holds is nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This is loaded after the control model, whose controls it reads.",
    },
  ],
} as const satisfies LuaModule
