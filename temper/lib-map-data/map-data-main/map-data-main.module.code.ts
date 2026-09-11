import "akasha/temper/lib-map-data/map-data-public-api/map-data-public-api.module.code.ts"
import { initEvents } from "akasha/temper/lib-map-data/map-data-events/map-data-events.module.code.ts"
import { initLogger } from "akasha/temper/lib-map-data/map-data-logger/map-data-logger.module.code.ts"
import { initMapQueries } from "akasha/temper/lib-map-data/map-data-queries/map-data-queries.module.code.ts"
import { initMapUpdate } from "akasha/temper/lib-map-data/map-data-update/map-data-update.module.code.ts"

initLogger()
initMapQueries()
initMapUpdate()
initEvents()
