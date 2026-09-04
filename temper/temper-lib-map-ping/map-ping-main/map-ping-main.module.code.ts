import "../map-ping-public-api/map-ping-public-api.module.code.ts"
import { initApi } from "../map-ping-api/map-ping-api.module.code.ts"
import { initCompatibility } from "../map-ping-compatibility/map-ping-compatibility.module.code.ts"
import { initializeHandler } from "../map-ping-initialization/map-ping-initialization.module.code.ts"

initApi()
initializeHandler()
initCompatibility()
