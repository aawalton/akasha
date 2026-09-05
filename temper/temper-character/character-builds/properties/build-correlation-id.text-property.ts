import type { TextProperty } from "@akasha/pages-system/text-property"

export type BuildCorrelationId = string

export const buildCorrelationId = {
  id: "01a06862-c4ee-7eb3-a4f2-21c62306945a",
  pageTypeSlug: "text-property",
  slug: "build-correlation-id",
  propertySlug: "correlation-id",
  definition: "the identity the client minted for a build before the build was kept",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build the client never named carries none.",
    },
    {
      invariantKind: "departure",
      statement: "This property is what the client sent rather than what the build is reached by.",
    },
  ],
} as const satisfies TextProperty
