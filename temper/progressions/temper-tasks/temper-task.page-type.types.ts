import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { Priority } from "../things/properties/priority.text-property.ts"
import type { Scope } from "../things/properties/scope.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"
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
