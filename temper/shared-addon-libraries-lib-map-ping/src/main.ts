import "./public-api"
import { initApi } from "./api"
import { initCompatibility } from "./compatibility"
import { initializeHandler } from "./initialization"

initApi()
initializeHandler()
initCompatibility()
