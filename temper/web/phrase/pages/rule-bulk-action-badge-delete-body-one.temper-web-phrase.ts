import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const ruleBulkActionBadgeDeleteBodyOne = {
  id: "01a0e2a8-ec3e-7ec0-9520-d40996669d58",
  type: "page-type/temper-web-phrase",
  slug: "rule-bulk-action-badge-delete-body-one",
  title: "This will permanently delete {count} {status} rule. This action cannot be undone.",
} as const satisfies TemperWebPhrase
