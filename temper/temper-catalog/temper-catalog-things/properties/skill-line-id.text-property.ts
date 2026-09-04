import type { TextProperty } from "@akasha/pages-system/text-property"

export type SkillLineId = string

export const skillLineId = {
  id: "01a05fba-ce3b-7214-b302-f798be22e99e",
  pageTypeSlug: "text-property",
  slug: "skill-line-id",
  propertySlug: "skill-line-id",
  definition: "the line a skill belongs to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to  a skill line." },
  ],
} as const satisfies TextProperty
