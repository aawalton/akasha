import type { Character } from "akasha/temper/progress/thing/properties/character.text-property.types.ts"
import type { CompletionCardId } from "akasha/temper/progress/thing/properties/completion-card-id.text-property.types.ts"
import type { CompletionItemPath } from "akasha/temper/progress/thing/properties/completion-item-path.text-property.types.ts"
import type { DueDate } from "akasha/temper/progress/thing/properties/due-date.calendar-date-property.types.ts"
import type { NodeId } from "akasha/temper/progress/thing/properties/node-id.text-property.types.ts"
import type { Priority } from "akasha/temper/progress/thing/properties/priority.text-property.types.ts"
import type { RruleAnchorFromCompletion } from "akasha/temper/progress/thing/properties/rrule-anchor-from-completion.boolean-property.types.ts"
import type { RruleRule } from "akasha/temper/progress/thing/properties/rrule-rule.text-property.types.ts"
import type { Scope } from "akasha/temper/progress/thing/properties/scope.text-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

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
