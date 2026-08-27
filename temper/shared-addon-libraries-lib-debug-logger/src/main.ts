import "./public-api"

import { initApi } from "./api"
import { initCallbacks } from "./callbacks"
import { initCompatibility } from "./compatibility"
import { initInitialization } from "./initialization"
import { initLogHandler } from "./log-handler"
import { initLogger } from "./logger"
import { initSettings } from "./settings"
import { initTimeSync } from "./time-sync"

initLogger()
initSettings()
initLogHandler()
initCallbacks()
initApi()
initCompatibility()
initInitialization()
initTimeSync()
