import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const characterBuildVersionBuild = {
  id: "01a0d89d-06ef-7056-b5d4-54f6aac7beb1",
  type: "page-type/relation-property",
  slug: "character-build-version-build",
  propertySlug: "build",
  definition: "the character build a version is a revision of",
  targetPageType: "page-type/character-build",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A version names its build by the build's address rather than by its id.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
