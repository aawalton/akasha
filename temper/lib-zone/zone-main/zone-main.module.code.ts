import "akasha/temper/lib-zone/zone-public-api/zone-public-api.module.code.ts"
import { initAutocompletion } from "akasha/temper/lib-zone/zone-autocompletion/zone-autocompletion.module.code.ts"
import {
  applyZoneNameFallbacks,
  removeNonLiveAPIVersionEntries,
} from "akasha/temper/lib-zone/zone-data-init/zone-data-init.module.code.ts"
import { initDungeonStatus } from "akasha/temper/lib-zone/zone-dungeon-status/zone-dungeon-status.module.code.ts"
import { initEvents } from "akasha/temper/lib-zone/zone-events/zone-events.module.code.ts"
import { initGeoDebug } from "akasha/temper/lib-zone/zone-geo-debug/zone-geo-debug.module.code.ts"
import { initGeoParent } from "akasha/temper/lib-zone/zone-geo-parent/zone-geo-parent.module.code.ts"
import { initZoneQueries } from "akasha/temper/lib-zone/zone-queries/zone-queries.module.code.ts"
import { initZoneScan } from "akasha/temper/lib-zone/zone-scan/zone-scan.module.code.ts"

applyZoneNameFallbacks()
removeNonLiveAPIVersionEntries()

initZoneQueries()
initZoneScan()
initDungeonStatus()
initGeoParent()
initGeoDebug()
initAutocompletion()

initEvents()
