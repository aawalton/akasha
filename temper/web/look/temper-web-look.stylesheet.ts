import type { Stylesheet } from "akasha/code/stylesheet/stylesheet.page-type.types.ts"

export const temperWebLook = {
  id: "01a0640f-850f-7bfd-8070-ae903b54ddb0",
  type: "page-type/stylesheet",
  slug: "temper-web-look",
  definition: "the look Temper's browser app wears, and the source trees of its utilities",
  styles: "css",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A source glob names where a file will be rather than where the file is now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glob matching nothing emits no utility and raises nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class no source spells is emitted only by being named inline here.",
    },
  ],
} as const satisfies Stylesheet
