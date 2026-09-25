import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiVirtualsLua = {
  id: "01a0d97d-36d3-7f75-ae72-44c6476e4633",
  type: "page-type/module",
  slug: "ui-virtuals-lua",
  definition:
    "the control templates and windows an interface document declares, written out as Lua",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A handler is written out as Lua, so the sandbox compiles it rather than a caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The templates go over in batches, because one Lua chunk holds only so much.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller names the windows to write out, because a document declares many.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Windows are written out as a list, in the order the caller names them.",
    },
  ],
} as const satisfies Module
