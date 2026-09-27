import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const ruleBulkActionBadgeDeleteTitleMany = {
  id: "01a0e2a8-ec3e-7e0b-8cdd-d5450e55d760",
  type: "page-type/temper-web-phrase",
  slug: "rule-bulk-action-badge-delete-title-many",
  title: "Delete {count} {status} Rules?",
} as const satisfies TemperWebPhrase
