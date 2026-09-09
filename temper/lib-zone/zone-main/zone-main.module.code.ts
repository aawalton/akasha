import "../zone-public-api/zone-public-api.module.code.ts"
import { initAutocompletion } from "../zone-autocompletion/zone-autocompletion.module.code.ts"
import {
  applyZoneNameFallbacks,
  removeNonLiveAPIVersionEntries,
} from "../zone-data-init/zone-data-init.module.code.ts"
import { initDungeonStatus } from "../zone-dungeon-status/zone-dungeon-status.module.code.ts"
import { initEvents } from "../zone-events/zone-events.module.code.ts"
import { initGeoDebug } from "../zone-geo-debug/zone-geo-debug.module.code.ts"
import { initGeoParent } from "../zone-geo-parent/zone-geo-parent.module.code.ts"
import { initZoneQueries } from "../zone-queries/zone-queries.module.code.ts"
import { initZoneScan } from "../zone-scan/zone-scan.module.code.ts"

applyZoneNameFallbacks()
removeNonLiveAPIVersionEntries()

initZoneQueries()
initZoneScan()
initDungeonStatus()
initGeoParent()
initGeoDebug()
initAutocompletion()

initEvents()
