import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const companionRotationBreakdownPanelCardNothingSimulated = {
  id: "01a0e2b9-c5b1-7771-9e7f-042ba3c9a25d",
  type: "page-type/temper-web-phrase",
  slug: "companion-rotation-breakdown-panel-card-nothing-simulated",
  title: "Nothing simulated",
  description:
    "None of the slotted skills are ones the rotation simulation runs. It skips passive skills and any skill it has no data for, and every slot on the bar fell into one of those. If these are normal active skills, the gap is in Temper's skill data, not in your setup.",
} as const satisfies TemperWebPhrase
