import type { TextProperty } from "@akasha/pages-system/text-property"

export type DueDate = string

export const dueDate = {
  id: "01a05fc6-81fc-7485-b3cd-4d985650b1af",
  pageTypeSlug: "text-property",
  slug: "due-date",
  propertySlug: "due-date",
  definition: "the day a task is next wanted",
  max: 10,
  nameFormatSlug: null,
  invariants: [
    { invariantKind: "departure", statement: "A due date is written as an ISO 8601 calendar day." },
  ],
} as const satisfies TextProperty
