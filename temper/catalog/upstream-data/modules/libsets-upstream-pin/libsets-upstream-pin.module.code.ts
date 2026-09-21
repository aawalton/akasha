export interface UpstreamPin {
  readonly repo: string
  readonly commit: string
  readonly version: string
  readonly addOnVersion: string
  readonly checkoutDirName: string
  readonly addonSubdir: string
  readonly manifestFile: string
  readonly requiredFiles: readonly string[]
}

export const LIBSETS_UPSTREAM: UpstreamPin = {
  repo: "https://github.com/Baertram/LibSets.git",
  commit: "4665f55d15171687bb92ee8a64ce73e8056843c0",
  version: "0.9.2",
  addOnVersion: "0009020",
  checkoutDirName: "Baertram-LibSets",
  addonSubdir: "LibSets",
  manifestFile: "LibSets.addon",
  requiredFiles: [
    "LibSets_ConstantsLibraryInternal.lua",
    "LibSets_Constants_All.lua",
    "Data/LibSets_Data_Zones.lua",
    "Data/LibSets_Data_Sets.lua",
    "Data/LibSets_Data_SetItemIds.lua",
    "Data/LibSets_Data_SetNames.lua",
    "Data/LibSets_Data_SetOtherData.lua",
  ],
}
