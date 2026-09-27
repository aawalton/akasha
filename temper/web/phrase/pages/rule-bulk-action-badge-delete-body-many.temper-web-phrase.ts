import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const ruleBulkActionBadgeDeleteBodyMany = {
  id: "01a0e2a8-ec3e-7872-937d-31058a224f15",
  type: "page-type/temper-web-phrase",
  slug: "rule-bulk-action-badge-delete-body-many",
  title: "This will permanently delete {count} {status} rules. This action cannot be undone.",
} as const satisfies TemperWebPhrase
