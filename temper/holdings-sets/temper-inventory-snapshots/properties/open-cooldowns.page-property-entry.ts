import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type OpenCooldowns = "jsonl"

export const openCooldowns = {
  id: "01a0675a-f185-721b-a712-f182fa1ba39b",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "open-cooldowns",
  propertySlug: "open-cooldowns",
  definition: "when each timed activity comes round again, one activity to a line",
  properties: [
    { pageProperty: "text-property/cooldown-key", required: true, many: false },
    { pageProperty: "instant-property/ready-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line is one cooldown a reading found.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cooldown names when that cooldown comes round again rather than how long is left.",
    },
  ],
} as const satisfies PagePropertyEntry
