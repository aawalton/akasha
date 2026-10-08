import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const companionBuildVersionBuild = {
  id: "01a0d897-3e34-79c5-b28b-56528e0bcb3a",
  type: "page-type/relation-property",
  slug: "companion-build-version-build",
  propertySlug: "build",
  definition: "the companion build a version is a revision of",
  targetPageType: "page-type/companion-build",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A version names its build by the build's address rather than by its id.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-25T12:43:05.652Z",
  updatedAt: "2026-09-25T12:43:10.000Z",
} as const satisfies RelationProperty
