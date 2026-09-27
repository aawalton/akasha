import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryRulesUnreadBody = {
  id: "01a0e2a3-d581-75f1-89bf-a200205a5e5d",
  type: "page-type/temper-web-phrase",
  slug: "inventory-rules-unread-body",
  title: "Nothing has been changed or saved",
  description:
    "Nothing has been changed and nothing has been saved. The rules already compiled into the game are the ones still running. This page stays shut until the rule below is mended, because showing the rest without it would leave out a rule you wrote.",
} as const satisfies TemperWebPhrase
