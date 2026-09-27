import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const companionStatsPanelCalculationFailed = {
  id: "01a0e2b9-c5b1-7aee-b2fe-ccede2322315",
  type: "page-type/temper-web-phrase",
  slug: "companion-stats-panel-calculation-failed",
  title: "Stat calculation failed",
  description:
    "Temper could not finish calculating this companion's stats, so none are shown. The failure is in Temper's calculation, not in your gear or skills — the error is in your browser console. Changing anything in the build runs the calculation again.",
} as const satisfies TemperWebPhrase
