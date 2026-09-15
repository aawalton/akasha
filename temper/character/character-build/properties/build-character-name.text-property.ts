import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buildCharacterName = {
  id: "01a0a545-7c20-7000-8e8e-c96525a19c3e",
  type: "page-type/text-property",
  slug: "build-character-name",
  propertySlug: "character-name",
  definition: "the name of the character this build was arranged for",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A build carries the character name it was arranged for rather than reading it off a character.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build shared across characters keeps the name it was arranged for.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
