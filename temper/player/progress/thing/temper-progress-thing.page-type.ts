import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperProgressThing = {
  id: "01a05fc6-81f8-7cb5-aed3-00e2ac534314",
  type: "page-type/page-type",
  slug: "temper-progress-thing",
  definition: "anything temper keeps a page for about what is done and what is left",
  extends: ["page-type/temper-thing"],
  parts: [
    "boolean-property/rrule-anchor-from-completion",
    "calendar-date-property/due-date",
    "relation-property/character",
    "text-property/completion-card-id",
    "text-property/completion-item-path",
    "text-property/node-id",
    "rrule-property/rrule-rule",
    "select-property/scope",
  ],
  properties: [
    { pageProperty: "text-property/node-id", required: false, many: false },
    { pageProperty: "relation-property/character", required: false, many: false },
    { pageProperty: "text-property/completion-card-id", required: false, many: false },
    {
      pageProperty: "text-property/completion-item-path",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "select-property/scope", required: false, many: false },
    { pageProperty: "select-property/priority", required: false, many: false },
    { pageProperty: "calendar-date-property/due-date", required: false, many: false },
    { pageProperty: "rrule-property/rrule-rule", required: false, many: false },
    {
      pageProperty: "boolean-property/rrule-anchor-from-completion",
      required: false,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page here names a thing Alan has done or a thing Alan has left to do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property more than one progress page type has is declared here.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
