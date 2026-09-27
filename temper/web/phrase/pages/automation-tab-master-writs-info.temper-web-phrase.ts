import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const automationTabMasterWritsInfo = {
  id: "01a0e2ac-36c7-765d-8b0a-3bb019ff8f33",
  type: "page-type/temper-web-phrase",
  slug: "automation-tab-master-writs-info",
  title:
    "Enable automated master-writ (sealed writ) crafting for all characters. Off by default — master writs consume expensive materials. Independent of daily writs.",
} as const satisfies TemperWebPhrase
