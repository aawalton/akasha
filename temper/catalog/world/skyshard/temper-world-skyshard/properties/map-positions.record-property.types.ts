import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { MapFolder } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/map-folder.text-property.types.ts"
import type { MapTile } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/map-tile.text-property.types.ts"
import type { MapX } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/map-x.number-property.types.ts"
import type { MapY } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/map-y.number-property.types.ts"
import type { PlaceKinds } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/place-kinds.number-property.types.ts"

export type MapPositions = List<{
  mapFolder: MapFolder
  mapTile: MapTile
  mapX: MapX
  mapY: MapY
  placeKinds?: PlaceKinds
}>
