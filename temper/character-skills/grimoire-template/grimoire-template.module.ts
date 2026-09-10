import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const grimoireTemplate = {
  id: "01a0617a-2c71-79f4-a4d5-74abd5b08c47",
  pageTypeSlug: "module",
  slug: "grimoire-template",
  definition: "the shape a scribing grimoire carries with its compatible scripts",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A grimoire names every script that may combine into a scribed skill.",
    },
  ],
} as const satisfies Module
