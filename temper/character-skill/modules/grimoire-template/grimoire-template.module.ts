import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const grimoireTemplate = {
  id: "01a0617a-2c71-79f4-a4d5-74abd5b08c47",
  type: "page-type/module",
  slug: "grimoire-template",
  definition: "the shape a scribing grimoire carries with its compatible scripts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A grimoire names every script that may combine into a scribed skill.",
    },
  ],
} as const satisfies Module
