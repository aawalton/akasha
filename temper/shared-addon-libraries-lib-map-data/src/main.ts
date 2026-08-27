import "./public-api"
import { initEvents } from "./events"
import { initLogger } from "./logger"
import { initMapQueries } from "./map-queries"
import { initMapUpdate } from "./map-update"

initLogger()
initMapQueries()
initMapUpdate()
initEvents()
