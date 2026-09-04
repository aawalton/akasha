export const UPSTREAM_LIBRARIES = ["housing", "lib-map-data", "lib-treasure", "lib-zone"] as const

export type UpstreamLibrary = (typeof UPSTREAM_LIBRARIES)[number]

export const PACKAGE_OF: Record<UpstreamLibrary, string> = {
  housing: "temper/game-housing-addon",
  "lib-map-data": "temper/shared-addon-libraries-lib-map-data",
  "lib-treasure": "temper/shared-addon-libraries-lib-treasure",
  "lib-zone": "temper/shared-addon-libraries-lib-zone",
}

export const SOURCES_OF: Record<UpstreamLibrary, readonly string[]> = {
  housing: ["PortToFriendsHouse/PortToFriendsHouseLibraryData.lua"],
  "lib-map-data": ["LibMapData/LibMapData_Data.lua"],
  "lib-treasure": ["LibTreasure/data.lua", "LibTreasure/icons.lua"],
  "lib-zone": ["LibZone/LibZone_Data.lua", "LibZone/LibZone_GeoData.lua"],
}

export type Ruling = {
  readonly report: readonly string[]
  readonly parted: readonly string[]
}

export class PortMismatch extends Error {}

export function libraryNamed(given: string | undefined): UpstreamLibrary | undefined {
  return UPSTREAM_LIBRARIES.find((one) => one === given)
}
