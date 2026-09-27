import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { servedRouterApp } from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

await servedRouterApp({
  name: "temper/web",
  root: import.meta.dir,
  csp: { imgSrc: ["https://esoicons.uesp.net"] },
  whoIsReading: handoverReader(TEMPER_SITE),
})
