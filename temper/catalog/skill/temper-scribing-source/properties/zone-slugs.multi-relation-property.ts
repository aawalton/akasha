import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const zoneSlugs = {
  id: "01a05fca-cb88-7387-b51b-731bff669c39",
  type: "page-type/multi-relation-property",
  slug: "zone-slugs",
  propertySlug: "zone-slugs",
  definition: "a scribing source's zones",
  targetPageType: "page-type/temper-zone",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone here is one scripts drop in rather than one completion is shown against.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
