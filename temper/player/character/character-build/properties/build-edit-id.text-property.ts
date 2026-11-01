import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buildEditId = {
  id: "01a198c1-a5f5-7fa7-8d3d-bf20866e2262",
  type: "page-type/text-property",
  slug: "build-edit-id",
  propertySlug: "edit-id",
  definition: "the in-game change to a build that last reached the build's page",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game mints one id for the changes made to a build between two of its readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An in-game change whose id the page holds lands over what that change landed before.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T20:16:30.196Z",
  updatedAt: "2026-11-01T20:16:30.196Z",
} as const satisfies TextProperty
