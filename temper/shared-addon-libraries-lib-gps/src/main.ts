import "./public-api"
import { initApi } from "./api"
import { initCompatibility } from "./compatibility"
import { initialize } from "./initialization"

initApi()
initialize()
initCompatibility()
