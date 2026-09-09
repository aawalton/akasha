import type { TextProperty } from "@akasha/pages/text-property"

export type LastRunOutcome = string

export const lastRunOutcome = {
  id: "01a05fd3-4362-7b80-9591-3e5f58ebfa66",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "last-run-outcome",
  propertySlug: "last-run-outcome",
  definition: "what a watcher reported of the run it made last",
  maxLength: 20000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "A report is held as JSON text rather than as the fields a report carries.",
    },
  ],
} as const satisfies TextProperty
