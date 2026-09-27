import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scriptEditDialog = {
  id: "01a0642c-5ba9-7595-9272-3c4468593f64",
  type: "page-type/module",
  slug: "script-edit-dialog",
  definition: "the dialog editing a scribing script",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The scripts' description is worked out again whenever the skill catalogue is read again.",
    },
  ],
} as const satisfies Module
