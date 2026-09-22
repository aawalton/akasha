import type { Priority } from "akasha/page/properties/priority.select-property.types.ts"
import type { CharacterSortOrder } from "akasha/temper/player/progress/temper-task/properties/character-sort-order.number-property.types.ts"
import type { CompletedAt } from "akasha/temper/player/progress/temper-task/properties/completed-at.instant-property.types.ts"
import type { DueTime } from "akasha/temper/player/progress/temper-task/properties/due-time.calendar-time-property.types.ts"
import type { EffectiveCharacter } from "akasha/temper/player/progress/temper-task/properties/effective-character.relation-property.types.ts"
import type { LastCompletedAt } from "akasha/temper/player/progress/temper-task/properties/last-completed-at.instant-property.types.ts"
import type { PendingSync } from "akasha/temper/player/progress/temper-task/properties/pending-sync.boolean-property.types.ts"
import type { Progress } from "akasha/temper/player/progress/temper-task/properties/progress.temper-task-progress.types.ts"
import type { ProgressCurrent } from "akasha/temper/player/progress/temper-task/properties/progress-current.number-property.types.ts"
import type { ProgressTotal } from "akasha/temper/player/progress/temper-task/properties/progress-total.number-property.types.ts"
import type { Scope } from "akasha/temper/player/progress/thing/properties/scope.select-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.text-property.types.ts"

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
