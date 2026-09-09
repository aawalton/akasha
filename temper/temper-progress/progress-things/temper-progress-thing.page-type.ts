import type { PageType } from "@akasha/pages/page-type"
import type { TemperThing } from "../../things/temper-thing.page-type.ts"
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
  completionItemPath?: readonly CompletionItemPath[]
  scope?: Scope
  priority?: Priority
  dueDate?: DueDate
  rruleRule?: RruleRule
  rruleAnchorFromCompletion?: RruleAnchorFromCompletion
}

export const temperProgressThing = {
  id: "01a05fc6-81f8-7cb5-aed3-00e2ac534314",
  pageTypeSlug: "page-type",
  slug: "temper-progress-thing",
  definition: "anything temper keeps a page for about what is done and what is left",
  pluralSlug: "temper-progress-things",
  extends: ["page-type/temper-thing"],
  parts: [
    "boolean-property/rrule-anchor-from-completion",
    "calendar-date-property/due-date",
    "text-property/character",
    "text-property/completion-card-id",
    "text-property/completion-item-path",
    "text-property/node-id",
    "text-property/priority",
    "text-property/rrule-rule",
    "text-property/scope",
  ],
  properties: [
    { pagePropertySlug: "text-property/node-id", required: false, many: false },
    { pagePropertySlug: "text-property/character", required: false, many: false },
    { pagePropertySlug: "text-property/completion-card-id", required: false, many: false },
    {
      pagePropertySlug: "text-property/completion-item-path",
      required: false,
      many: true,
      maxCount: null,
    },
    { pagePropertySlug: "text-property/scope", required: false, many: false },
    { pagePropertySlug: "text-property/priority", required: false, many: false },
    { pagePropertySlug: "calendar-date-property/due-date", required: false, many: false },
    { pagePropertySlug: "text-property/rrule-rule", required: false, many: false },
    {
      pagePropertySlug: "boolean-property/rrule-anchor-from-completion",
      required: false,
      many: false,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page here names a thing Alan has done or a thing Alan has left to do.",
    },
    {
      invariantKind: "departure",
      statement: "A property more than one progress page type has is declared here.",
    },
  ],
} as const satisfies PageType
