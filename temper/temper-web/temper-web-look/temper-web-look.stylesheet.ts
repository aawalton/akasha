import type { Stylesheet } from "@akasha/code-system/stylesheet"

export const temperWebLook = {
  id: "01a0640f-850f-7bfd-8070-ae903b54ddb0",
  pageTypeSlug: "stylesheet",
  slug: "temper-web-look",
  definition: "the look Temper's browser app wears, and the trees its utilities are read from",
  styles: "css",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source glob names where a file will be rather than where the file is now.",
    },
    {
      invariantKind: "departure",
      statement: "A glob matching nothing emits no utility and raises nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A class no source spells is emitted only by being named inline here.",
    },
  ],
} as const satisfies Stylesheet
