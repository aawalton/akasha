import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"
import type { Character } from "./properties/character.text-property.ts"
import type { CompletionCardId } from "./properties/completion-card-id.text-property.ts"
import type { CompletionItemPath } from "./properties/completion-item-path.text-property.ts"
import type { DueDate } from "./properties/due-date.calendar-date-property.ts"
import type { NodeId } from "./properties/node-id.text-property.ts"
import type { Priority } from "./properties/priority.text-property.ts"
import type { RruleAnchorFromCompletion } from "./properties/rrule-anchor-from-completion.boolean-property.ts"
import type { RruleRule } from "./properties/rrule-rule.text-property.ts"
import type { Scope } from "./properties/scope.text-property.ts"

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
