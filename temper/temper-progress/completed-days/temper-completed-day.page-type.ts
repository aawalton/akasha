import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { Completions } from "./properties/completions.page-property-entry.ts"
import type { Day } from "./properties/day.text-property.ts"

export type TemperCompletedDay = TemperProgressThing & {
  day: Day
  completions?: Completions
}

export const temperCompletedDay = {
  id: "01a05fe1-6b00-798f-9559-cf3e74f22766",
  pageTypeSlug: "page-type",
  slug: "temper-completed-day",
  definition: "one day of tasks already marked done",
  pluralSlug: "temper-completed-days",
  extendsSlug: ["page-type/temper-progress-thing"],
  partSlugs: [
    "instant-property/completed-at",
    "page-property-entry/completions",
    "text-property/day",
    "text-property/task",
  ],
  properties: [
    { pagePropertySlug: "day", required: true, many: false },
    { pagePropertySlug: "completions", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A completion falls on the day the completion was marked.",
    },
    {
      invariantKind: "departure",
      statement: "A day already gone is written once and left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A day is the grain the completions are gathered at.",
    },
    {
      invariantKind: "constraint",
      statement: "A month of completions runs past the most bytes one file may hold.",
    },
    {
      invariantKind: "departure",
      statement: "A slug here opens with `day-` and closes with the calendar day.",
    },
    {
      invariantKind: "constraint",
      statement: "A slug opening with a digit is no export name.",
    },
  ],
} as const satisfies PageType
