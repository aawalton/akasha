import type { Priority } from "akasha/page/properties/priority.select-property.types.ts"
import type { Character } from "akasha/temper/player/progress/thing/properties/character.relation-property.types.ts"
import type { CompletionCard } from "akasha/temper/player/progress/thing/properties/completion-card.relation-property.types.ts"
import type { CompletionItemPath } from "akasha/temper/player/progress/thing/properties/completion-item-path.text-property.types.ts"
import type { DueDate } from "akasha/temper/player/progress/thing/properties/due-date.calendar-date-property.types.ts"
import type { NodeId } from "akasha/temper/player/progress/thing/properties/node-id.text-property.types.ts"
import type { RruleAnchorFromCompletion } from "akasha/temper/player/progress/thing/properties/rrule-anchor-from-completion.boolean-property.types.ts"
import type { RruleRule } from "akasha/temper/player/progress/thing/properties/rrule-rule.rrule-property.types.ts"
import type { Scope } from "akasha/temper/player/progress/thing/properties/scope.select-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperProgressThing = TemperThing & {
  nodeId?: NodeId
  character?: Character
  completionCard?: CompletionCard
  completionItemPath?: CompletionItemPath
  scope?: Scope
  priority?: Priority
  dueDate?: DueDate
  rruleRule?: RruleRule
  rruleAnchorFromCompletion?: RruleAnchorFromCompletion
}
