import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type AffixScripts = "jsonl"

export const affixScripts = {
  id: "01a05fca-cb80-7359-bca5-e38d0406dff4",
  pageTypeSlug: "page-property-entry",
  slug: "affix-scripts",
  propertySlug: "affix-scripts",
  definition: "the affix scripts a grimoire takes, one to a line",
  properties: [
    { pagePropertySlug: "script-id", required: true, many: false },
    { pagePropertySlug: "class-id", required: false, many: false },
    { pagePropertySlug: "description", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
