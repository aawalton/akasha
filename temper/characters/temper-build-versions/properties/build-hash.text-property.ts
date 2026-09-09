import type { TextProperty } from "@akasha/pages/text-property"

export type BuildHash = string

export const buildHash = {
  id: "01a0685d-89aa-782d-959a-2f5cebb21882",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "build-hash",
  propertySlug: "build-hash",
  definition: "the arrangement a version holds, written as one string",
  maxLength: 4000,
  nameFormat: null,
  invariants: [
    { invariantKind: "departure", statement: "Two versions arranged alike have one hash." },
    { invariantKind: "constraint", statement: "A hash runs longer than a name is allowed to run." },
  ],
} as const satisfies TextProperty
