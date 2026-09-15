import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsSavedVariables = {
  id: "01a060cd-564f-7386-bf3f-219a42b803ca",
  type: "module",
  slug: "errors-saved-variables",
  definition: "the shape the errors addon saves, ruled on as it is read back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved field the shape does not name is refused rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape is held to the payload the addon writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry list the addon left out reads as no entries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
