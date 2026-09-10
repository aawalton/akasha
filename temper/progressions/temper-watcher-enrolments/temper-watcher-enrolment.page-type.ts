import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperWatcherEnrolment = {
  id: "01a05fd3-4364-713f-be23-5bd09e86ad23",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-watcher-enrolment",
  definition: "one watcher allowed to have a machine's saved game files in",
  pluralSlug: "temper-watcher-enrolments",
  extends: ["page-type/temper-progress-thing"],
  parts: [
    "instant-property/token-created-at",
    "instant-property/token-last-used-at",
    "text-property/last-run-outcome",
    "text-property/token",
    "text-property/token-hash",
    "text-property/token-name",
  ],
  properties: [
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "text-property/token-hash", required: true, many: false },
    { pageProperty: "text-property/token-name", required: true, many: false },
    { pageProperty: "instant-property/token-created-at", required: true, many: false },
    { pageProperty: "text-property/token", required: false, many: false, secret: true },
    {
      pageProperty: "instant-property/token-last-used-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/last-run-outcome",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is recognised by the digest rather than by the token being held here.",
    },
    {
      invariantKind: "departure",
      statement: "An enrolment withdrawn is deleted rather than marked withdrawn.",
    },
  ],
  types: "ts",
} as const satisfies PageType
