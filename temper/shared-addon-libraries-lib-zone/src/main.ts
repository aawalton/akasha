import "./public-api"
import { initAutocompletion } from "./autocompletion"
import { applyZoneNameFallbacks, removeNonLiveAPIVersionEntries } from "./data-init"
import { initDungeonStatus } from "./dungeon-status"
import { initEvents } from "./events"
import { initGeoDebug } from "./geo-debug"
import { initGeoParent } from "./geo-parent"
import { initZoneQueries } from "./zone-queries"
import { initZoneScan } from "./zone-scan"

applyZoneNameFallbacks()
removeNonLiveAPIVersionEntries()

initZoneQueries()
initZoneScan()
initDungeonStatus()
initGeoParent()
initGeoDebug()
initAutocompletion()

initEvents()
