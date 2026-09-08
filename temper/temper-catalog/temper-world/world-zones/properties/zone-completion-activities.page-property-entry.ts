import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type ZoneCompletionActivities = "jsonl"

export const zoneCompletionActivities = {
  id: "01a06167-3f9b-700c-82b9-015808eb9637",
  pageTypeSlug: "page-property-entry",
  slug: "zone-completion-activities",
  propertySlug: "zone-completion-activities",
  definition: "the activities a zone is completed by, one activity to a line",
  properties: [
    { pagePropertySlug: "number-property/completion-type", required: true, many: false },
    { pagePropertySlug: "text-property/completion-type-label", required: true, many: false },
    { pagePropertySlug: "number-property/activity-index", required: true, many: false },
    { pagePropertySlug: "number-property/eso-activity-id", required: true, many: false },
    { pagePropertySlug: "text-property/activity-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An activity here has the label of the completion type the activity falls under.",
    },
  ],
} as const satisfies PagePropertyEntry
