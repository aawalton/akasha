import type { TextProperty } from "@akasha/pages/text-property"

export type ScriptId = string

export const scriptId = {
  id: "01a05fca-cb86-726d-9036-faa9f19d229d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "script-id",
  propertySlug: "script-id",
  definition: "the script an entry is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a script.",
    },
  ],
} as const satisfies TextProperty
