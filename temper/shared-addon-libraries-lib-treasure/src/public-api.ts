import {
  LibTreasure_AddIcon,
  LibTreasure_GetAllItemsData,
  LibTreasure_GetBookIdItemId,
  LibTreasure_GetIcons,
  LibTreasure_GetItemIdData,
  LibTreasure_GetMapIdData,
  LibTreasure_GetTextureData,
} from "./api"
import { asGlobalTable } from "./casts"
import { lib } from "./lib-state"

const glob = asGlobalTable(globalThis)

glob.LibTreasure = lib
glob.LIB_TREASURE = lib

glob.LibTreasure_GetAllItemsData = LibTreasure_GetAllItemsData
glob.LibTreasure_GetItemIdData = LibTreasure_GetItemIdData
glob.LibTreasure_GetMapIdData = LibTreasure_GetMapIdData
glob.LibTreasure_GetTextureData = LibTreasure_GetTextureData
glob.LibTreasure_GetBookIdItemId = LibTreasure_GetBookIdItemId
glob.LibTreasure_GetIcons = LibTreasure_GetIcons
glob.LibTreasure_AddIcon = LibTreasure_AddIcon
