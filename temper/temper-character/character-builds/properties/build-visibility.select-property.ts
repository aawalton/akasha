import type { SelectProperty } from "@akasha/pages-system/select-property"

export const buildVisibility = {
  id: "01a06862-c4ee-7a6d-886a-f9af2859fd5f",
  pageTypeSlug: "select-property",
  slug: "build-visibility",
  propertySlug: "visibility",
  definition: "how a build stands to the character holding it",
  values: ["live", "target", "private"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A live build is the arrangement the character wears now.",
    },
    {
      invariantKind: "departure",
      statement: "A target build is the arrangement the character is working toward.",
    },
    {
      invariantKind: "departure",
      statement: "A private build is neither, and stands only for its author.",
    },
  ],
} as const satisfies SelectProperty

export type BuildVisibility = (typeof buildVisibility.values)[number]
