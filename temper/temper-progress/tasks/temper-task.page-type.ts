import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { CharacterSortOrder } from "./properties/character-sort-order.number-property.ts"
import type { DueTime } from "./properties/due-time.calendar-time-property.ts"
import type { EffectiveCharacter } from "./properties/effective-character.text-property.ts"
import type { LastCompletedAt } from "./properties/last-completed-at.instant-property.ts"
import type { PendingSync } from "./properties/pending-sync.boolean-property.ts"
import type { Progress } from "./properties/progress.page-property-entry.ts"
import type { ProgressCurrent } from "./properties/progress-current.number-property.ts"
import type { ProgressTotal } from "./properties/progress-total.number-property.ts"

export type TemperTask = TemperProgressThing & {
  characterSortOrder?: CharacterSortOrder
  dueTime?: DueTime
  effectiveCharacter?: EffectiveCharacter
  lastCompletedAt?: LastCompletedAt
  pendingSync?: PendingSync
  progress?: Progress
  progressTotal?: ProgressTotal
  progressCurrent?: ProgressCurrent
}

export const temperTask = {
  id: "01a05fd3-435f-7ddd-a951-70e6e3d31e07",
  pageTypeSlug: "page-type",
  slug: "temper-task",
  definition: "something Alan means to do in the game, once or again and again",
  pluralSlug: "temper-tasks",
  extendsSlug: ["page-type/temper-progress-thing"],
  partSlugs: [
    "boolean-property/pending-sync",
    "calendar-time-property/due-time",
    "instant-property/last-completed-at",
    "number-property/character-sort-order",
    "number-property/progress-current",
    "number-property/progress-total",
    "page-property-entry/progress",
    "text-property/character-name",
    "text-property/effective-character",
  ],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "scope", required: true, many: false },
    { pagePropertySlug: "priority", required: true, many: false },
    { pagePropertySlug: "calendar-time-property/due-time", required: false, many: false },
    { pagePropertySlug: "effective-character", required: false, many: false },
    { pagePropertySlug: "last-completed-at", required: false, many: false },
    { pagePropertySlug: "progress", required: false, many: false },
    { pagePropertySlug: "progress-total", required: false, many: false },
    { pagePropertySlug: "progress-current", required: false, many: false },
    { pagePropertySlug: "character-sort-order", required: false, many: false },
    { pagePropertySlug: "pending-sync", required: false, many: false, uncommitted: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task stating no recurrence is done once and then deleted.",
    },
    {
      invariantKind: "departure",
      statement: "A task of `character` scope falls to the one character the task names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A task of `next_character` scope falls to the character the task names as effective.",
    },
  ],
} as const satisfies PageType
