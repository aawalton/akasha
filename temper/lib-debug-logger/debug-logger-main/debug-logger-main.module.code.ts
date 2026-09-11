import "akasha/temper/lib-debug-logger/debug-logger-global/debug-logger-global.module.code.ts"

import { initApi } from "akasha/temper/lib-debug-logger/debug-logger-api/debug-logger-api.module.code.ts"
import { initCallbacks } from "akasha/temper/lib-debug-logger/debug-logger-callbacks/debug-logger-callbacks.module.code.ts"
import { initCompatibility } from "akasha/temper/lib-debug-logger/debug-logger-compatibility/debug-logger-compatibility.module.code.ts"
import { initLogHandler } from "akasha/temper/lib-debug-logger/debug-logger-log-handler/debug-logger-log-handler.module.code.ts"
import { initSettings } from "akasha/temper/lib-debug-logger/debug-logger-settings/debug-logger-settings.module.code.ts"
import { initStartup } from "akasha/temper/lib-debug-logger/debug-logger-startup/debug-logger-startup.module.code.ts"
import { initLogger } from "akasha/temper/lib-debug-logger/debug-logger-tagged-logger/debug-logger-tagged-logger.module.code.ts"

initLogger()
initSettings()
initLogHandler()
initCallbacks()
initApi()
initCompatibility()
initStartup()
