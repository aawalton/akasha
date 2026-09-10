import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperProgressThing = {
  id: "01a05fc6-81f8-7cb5-aed3-00e2ac534314",
  pageTypeSlug: "page-type",
  type: "page-type",
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
    { pageProperty: "text-property/node-id", required: false, many: false },
    { pageProperty: "text-property/character", required: false, many: false },
    { pageProperty: "text-property/completion-card-id", required: false, many: false },
    {
      pageProperty: "text-property/completion-item-path",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/scope", required: false, many: false },
    { pageProperty: "text-property/priority", required: false, many: false },
    { pageProperty: "calendar-date-property/due-date", required: false, many: false },
    { pageProperty: "text-property/rrule-rule", required: false, many: false },
    {
      pageProperty: "boolean-property/rrule-anchor-from-completion",
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
  types: "ts",
} as const satisfies PageType
