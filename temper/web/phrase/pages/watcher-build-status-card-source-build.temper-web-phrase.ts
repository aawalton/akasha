import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherBuildStatusCardSourceBuild = {
  id: "01a0e2a8-9c89-764d-997d-c2cf97a235ff",
  type: "page-type/temper-web-phrase",
  slug: "watcher-build-status-card-source-build",
  title: "Watcher is running from source{ago}",
  description:
    "This Watcher reports itself as a development build rather than a released one, so Temper cannot compare it to what it serves. That is expected when the Watcher runs from source. From a downloaded Watcher it would mean the build was stamped wrong — worth telling us about.",
} as const satisfies TemperWebPhrase
