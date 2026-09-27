import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWebPhrase = {
  id: "01a0e299-6ed9-7114-a745-1830d563ab9f",
  type: "page-type/page-type",
  slug: "temper-web-phrase",
  definition: "a piece of wording a Temper web screen shows around the things it names",
  extends: ["page-type/temper-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the name a screen asks for the phrase by, led by the screen's module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the phrase a reader is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name in braces in the title is filled by the screen that shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
