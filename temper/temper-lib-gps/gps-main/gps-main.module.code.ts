import "../gps-public-api/gps-public-api.module.code.ts"
import { initApi } from "../gps-api/gps-api.module.code.ts"
import { initCompatibility } from "../gps-compatibility/gps-compatibility.module.code.ts"
import { initialize } from "../gps-initialization/gps-initialization.module.code.ts"

initApi()
initialize()
initCompatibility()
