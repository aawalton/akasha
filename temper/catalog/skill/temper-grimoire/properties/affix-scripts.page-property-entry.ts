import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const affixScripts = {
  id: "01a05fca-cb80-7359-bca5-e38d0406dff4",
  type: "page-type/page-property-entry",
  slug: "affix-scripts",
  propertySlug: "affix-scripts",
  definition: "the affix scripts a grimoire takes, one to a line",
  properties: [
    { pageProperty: "relation-property/script-id", required: true, many: false },
    { pageProperty: "relation-property/class-id", required: false, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
