import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWatcherEnrolment = {
  id: "01a05fd3-4364-713f-be23-5bd09e86ad23",
  type: "page-type/page-type",
  slug: "temper-watcher-enrolment",
  definition: "a watcher allowed to send a machine's saved game files",
  extends: ["page-type/temper-progress-thing"],
  parts: [
    "instant-property/token-created-at",
    "instant-property/token-last-used-at",
    "text-property/last-run-outcome",
    "text-property/token",
    "text-property/token-hash",
    "text-property/token-name",
    "text-property/watcher-version",
    "instant-property/reported-at",
    "page-property-entry/watcher-operations",
  ],
  properties: [
    { pageProperty: "relation-property/account-page", required: true, many: false },
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
    {
      pageProperty: "text-property/watcher-version",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/reported-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "page-property-entry/watcher-operations",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call is recognised by the digest rather than by the token being held here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enrolment withdrawn is deleted rather than marked withdrawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a watcher reports of its last run is kept outside the commit, since every run writes it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
