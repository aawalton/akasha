import type { CharacterSortOrder } from "akasha/temper/progressions/temper-tasks/properties/character-sort-order.number-property.types.ts"
import type { CompletedAt } from "akasha/temper/progressions/temper-tasks/properties/completed-at.instant-property.types.ts"
import type { DueTime } from "akasha/temper/progressions/temper-tasks/properties/due-time.calendar-time-property.types.ts"
import type { EffectiveCharacter } from "akasha/temper/progressions/temper-tasks/properties/effective-character.text-property.types.ts"
import type { LastCompletedAt } from "akasha/temper/progressions/temper-tasks/properties/last-completed-at.instant-property.types.ts"
import type { PendingSync } from "akasha/temper/progressions/temper-tasks/properties/pending-sync.boolean-property.types.ts"
import type { Progress } from "akasha/temper/progressions/temper-tasks/properties/progress.page-property-entry.types.ts"
import type { ProgressCurrent } from "akasha/temper/progressions/temper-tasks/properties/progress-current.number-property.types.ts"
import type { ProgressTotal } from "akasha/temper/progressions/temper-tasks/properties/progress-total.number-property.types.ts"
import type { Priority } from "akasha/temper/progressions/things/properties/priority.text-property.types.ts"
import type { Scope } from "akasha/temper/progressions/things/properties/scope.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"

export type TemperTask = TemperProgressThing & {
  accountPage: AccountPage
  scope: Scope
  priority: Priority
  dueTime?: DueTime
  effectiveCharacter?: EffectiveCharacter
  lastCompletedAt?: LastCompletedAt
  completedAt?: CompletedAt
  progress?: Progress
  progressTotal?: ProgressTotal
  progressCurrent?: ProgressCurrent
  characterSortOrder?: CharacterSortOrder
  pendingSync?: PendingSync
}
