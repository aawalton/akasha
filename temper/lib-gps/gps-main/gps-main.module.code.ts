import "akasha/temper/lib-gps/gps-public-api/gps-public-api.module.code.ts"
import { initApi } from "akasha/temper/lib-gps/gps-api/gps-api.module.code.ts"
import { initCompatibility } from "akasha/temper/lib-gps/gps-compatibility/gps-compatibility.module.code.ts"
import { initialize } from "akasha/temper/lib-gps/gps-initialization/gps-initialization.module.code.ts"

initApi()
initialize()
initCompatibility()
