import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const statsPanelNoMatch = {
  id: "01a0e2ae-f16d-78a0-8635-b43ce42e5551",
  type: "page-type/temper-web-phrase",
  slug: "stats-panel-no-match",
  title: 'No stats match "{search}"',
} as const satisfies TemperWebPhrase
