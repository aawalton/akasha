import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const temperAppShell = {
  id: "01a06429-76ff-706c-b325-038f0e4a4fb7",
  type: "page-type/module",
  slug: "temper-app-shell",
  definition: "the frame Temper draws every page inside, with its nav and its sign-out",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every item this shell draws in its navigation is a nav page, and none is in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its brand and sign-out wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No screen inside it is drawn until the web phrases are read and held.",
    },
  ],
} as const satisfies Module
