import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buildCorrelationId = {
  id: "01a06862-c4ee-7eb3-a4f2-21c62306945a",
  type: "page-type/text-property",
  slug: "build-correlation-id",
  propertySlug: "correlation-id",
  definition: "the identity the client minted for a build before the build was kept",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build the client never named has no correlation id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This property is the id the client sent rather than the id the build is reached by.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
