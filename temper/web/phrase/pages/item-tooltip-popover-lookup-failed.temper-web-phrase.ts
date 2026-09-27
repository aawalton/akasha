import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const itemTooltipPopoverLookupFailed = {
  id: "01a0e2af-9e69-7f89-a528-e0932cfdf862",
  type: "page-type/temper-web-phrase",
  slug: "item-tooltip-popover-lookup-failed",
  title:
    "Temper's item lookup did not answer, so these details are missing right now rather than absent. Reopening the tooltip will try again.",
} as const satisfies TemperWebPhrase
