import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiPlaceModel = {
  id: "01a0c9f1-36c1-73df-8646-fa76a2dbda20",
  type: "page-type/lua-module",
  slug: "ui-place-model",
  definition: "where on the screen a control the sandbox holds sits",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A point on a control is a fraction of that control's width and height.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control with one anchor takes the width and the height the control states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control with two anchors takes the width and the height those anchors leave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two anchors sharing a fraction leave that measure to what the control states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control with no anchor sits at the top left of its parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An anchor to a table that is no control is answered with the screen's own corner.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control anchored to itself through a ring is answered with what it states once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This is loaded before the controls, so a control reaches it as a global.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing worked out here is kept between one call and the next.",
    },
  ],
} as const satisfies LuaModule
