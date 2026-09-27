import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWebPhrase = {
  id: "01a0e299-6ed9-7114-a745-1830d563ab9f",
  type: "page-type/page-type",
  slug: "temper-web-phrase",
  definition: "a piece of wording a Temper web screen shows around the things it names",
  extends: ["page-type/temper-thing"],

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen asks for a phrase by its slug, read off the page it imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the phrase a reader is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wording longer than a title holds goes whole into the description.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug never holds two hyphens running.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A name in braces in the title is filled by the screen that shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
