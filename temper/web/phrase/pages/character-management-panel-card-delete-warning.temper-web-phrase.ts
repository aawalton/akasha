import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const characterManagementPanelCardDeleteWarning = {
  id: "01a0e2a2-b3f0-78f2-95cd-1ec4d5470dcf",
  type: "page-type/temper-web-phrase",
  slug: "character-management-panel-card-delete-warning",
  title: 'This will permanently delete "{name}". This action cannot be undone.',
} as const satisfies TemperWebPhrase
