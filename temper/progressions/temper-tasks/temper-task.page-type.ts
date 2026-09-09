import type { PageType } from "@akasha/pages/page-type"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.ts"
import type { CharacterSortOrder } from "./properties/character-sort-order.number-property.ts"
import type { CompletedAt } from "./properties/completed-at.instant-property.ts"
import type { DueTime } from "./properties/due-time.calendar-time-property.ts"
import type { EffectiveCharacter } from "./properties/effective-character.text-property.ts"
import type { LastCompletedAt } from "./properties/last-completed-at.instant-property.ts"
import type { PendingSync } from "./properties/pending-sync.boolean-property.ts"
import type { Progress } from "./properties/progress.page-property-entry.ts"
import type { ProgressCurrent } from "./properties/progress-current.number-property.ts"
import type { ProgressTotal } from "./properties/progress-total.number-property.ts"

export type TemperTask = TemperProgressThing & {
  characterSortOrder?: CharacterSortOrder
  completedAt?: CompletedAt
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
  type: "page-type",
  slug: "temper-task",
  definition: "something Alan means to do in the game, once or again and again",
  pluralSlug: "temper-tasks",
  extends: ["page-type/temper-progress-thing"],
  parts: [
    "boolean-property/pending-sync",
    "calendar-time-property/due-time",
    "instant-property/completed-at",
    "instant-property/last-completed-at",
    "number-property/character-sort-order",
    "number-property/progress-current",
    "number-property/progress-total",
    "page-property-entry/progress",
    "text-property/character-name",
    "text-property/effective-character",
  ],
  properties: [
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "text-property/scope", required: true, many: false },
    { pageProperty: "text-property/priority", required: true, many: false },
    { pageProperty: "calendar-time-property/due-time", required: false, many: false },
    { pageProperty: "text-property/effective-character", required: false, many: false },
    { pageProperty: "instant-property/last-completed-at", required: false, many: false },
    { pageProperty: "instant-property/completed-at", required: false, many: false },
    { pageProperty: "page-property-entry/progress", required: false, many: false },
    { pageProperty: "number-property/progress-total", required: false, many: false },
    { pageProperty: "number-property/progress-current", required: false, many: false },
    { pageProperty: "number-property/character-sort-order", required: false, many: false },
    {
      pageProperty: "boolean-property/pending-sync",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task stating no recurrence is marked done and kept.",
    },
    {
      invariantKind: "departure",
      statement: "A due date moves on what the characters did rather than on the day changing.",
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
