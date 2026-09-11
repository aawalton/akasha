import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"
import type { Character } from "./properties/character.text-property.types.ts"
import type { CompletionCardId } from "./properties/completion-card-id.text-property.types.ts"
import type { CompletionItemPath } from "./properties/completion-item-path.text-property.types.ts"
import type { DueDate } from "./properties/due-date.calendar-date-property.types.ts"
import type { NodeId } from "./properties/node-id.text-property.types.ts"
import type { Priority } from "./properties/priority.text-property.types.ts"
import type { RruleAnchorFromCompletion } from "./properties/rrule-anchor-from-completion.boolean-property.types.ts"
import type { RruleRule } from "./properties/rrule-rule.text-property.types.ts"
import type { Scope } from "./properties/scope.text-property.types.ts"

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
