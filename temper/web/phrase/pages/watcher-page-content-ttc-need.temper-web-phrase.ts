import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherPageContentTtcNeed = {
  id: "01a0e2b2-5f0d-771a-a7ea-fd717948a95b",
  type: "page-type/temper-web-phrase",
  slug: "watcher-page-content-ttc-need",
  title: "Why the Watcher needs Tamriel Trade Centre",
  description:
    "{name}, for item prices. This one is not ours and is not in our download — it is a separate community add-on whose terms do not allow anyone else to redistribute it, so you install it yourself. It is where Temper gets guild-store prices. Without it Temper still sees every item you own, but it can only value them at what a vendor would pay, which is a small fraction of what they are actually worth. Your item values and affordability all inherit that. Temper tells you on the inventory pages when a sync arrived without it.",
} as const satisfies TemperWebPhrase
