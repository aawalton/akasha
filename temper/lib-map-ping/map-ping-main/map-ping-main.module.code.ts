import "akasha/temper/lib-map-ping/map-ping-public-api/map-ping-public-api.module.code.ts"
import { initApi } from "akasha/temper/lib-map-ping/map-ping-api/map-ping-api.module.code.ts"
import { initCompatibility } from "akasha/temper/lib-map-ping/map-ping-compatibility/map-ping-compatibility.module.code.ts"
import { initializeHandler } from "akasha/temper/lib-map-ping/map-ping-initialization/map-ping-initialization.module.code.ts"

initApi()
initializeHandler()
initCompatibility()
