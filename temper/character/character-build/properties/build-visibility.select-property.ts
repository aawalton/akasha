import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const buildVisibility = {
  id: "01a06862-c4ee-7a6d-886a-f9af2859fd5f",
  type: "page-type/select-property",
  slug: "build-visibility",
  propertySlug: "visibility",
  definition: "how a build stands to the character with it",
  values: ["live", "target", "private"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A live build is the arrangement the character wears now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target build is the arrangement the character is working toward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A private build is neither worn now nor worked toward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A private build is there only for its author.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
