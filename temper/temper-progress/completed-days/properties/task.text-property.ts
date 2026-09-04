import type { TextProperty } from "@akasha/pages-system/text-property"

export type Task = string

export const task = {
  id: "01a05fd3-4361-79b0-aa04-a44db2ed0cec",
  pageTypeSlug: "text-property",
  slug: "task",
  propertySlug: "task",
  definition: "the recurring task a completion answers to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a temper task." },
  ],
} as const satisfies TextProperty
