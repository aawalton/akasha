import type { TextProperty } from "@akasha/pages-system/text-property"

export type BonusStatus = string

export const bonusStatus = {
  id: "01a05fd1-d437-73eb-b682-b54edb64a96b",
  pageTypeSlug: "text-property",
  slug: "bonus-status",
  propertySlug: "status",
  definition: "how far temper models what a set bonus does",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A bonus marked unsupported moves no metric temper counts.",
    },
  ],
} as const satisfies TextProperty
