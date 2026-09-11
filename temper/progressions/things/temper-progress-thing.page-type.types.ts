import type { Character } from "akasha/temper/progressions/things/properties/character.text-property.types.ts"
import type { CompletionCardId } from "akasha/temper/progressions/things/properties/completion-card-id.text-property.types.ts"
import type { CompletionItemPath } from "akasha/temper/progressions/things/properties/completion-item-path.text-property.types.ts"
import type { DueDate } from "akasha/temper/progressions/things/properties/due-date.calendar-date-property.types.ts"
import type { NodeId } from "akasha/temper/progressions/things/properties/node-id.text-property.types.ts"
import type { Priority } from "akasha/temper/progressions/things/properties/priority.text-property.types.ts"
import type { RruleAnchorFromCompletion } from "akasha/temper/progressions/things/properties/rrule-anchor-from-completion.boolean-property.types.ts"
import type { RruleRule } from "akasha/temper/progressions/things/properties/rrule-rule.text-property.types.ts"
import type { Scope } from "akasha/temper/progressions/things/properties/scope.text-property.types.ts"
import type { TemperThing } from "akasha/temper/things/temper-thing.page-type.types.ts"

export type TemperProgressThing = TemperThing & {
  nodeId?: NodeId
  character?: Character
  completionCardId?: CompletionCardId
  completionItemPath?: CompletionItemPath
  scope?: Scope
  priority?: Priority
  dueDate?: DueDate
  rruleRule?: RruleRule
  rruleAnchorFromCompletion?: RruleAnchorFromCompletion
}
