import {
  libTreasureAddIcon,
  libTreasureGetAllItemsData,
  libTreasureGetBookIdItemId,
  libTreasureGetIcons,
  libTreasureGetItemIdData,
  libTreasureGetMapIdData,
  libTreasureGetTextureData,
} from "../treasure-api/treasure-api.module.code.ts"
import type { GlobalTable } from "../treasure-casts/treasure-casts.module.code.ts"
import { LIB } from "../treasure-lib-state/treasure-lib-state.module.code.ts"

const glob = globalThis as GlobalTable

glob.LibTreasure = LIB
glob.LIB_TREASURE = LIB

glob.LibTreasure_GetAllItemsData = libTreasureGetAllItemsData
glob.LibTreasure_GetItemIdData = libTreasureGetItemIdData
glob.LibTreasure_GetMapIdData = libTreasureGetMapIdData
glob.LibTreasure_GetTextureData = libTreasureGetTextureData
glob.LibTreasure_GetBookIdItemId = libTreasureGetBookIdItemId
glob.LibTreasure_GetIcons = libTreasureGetIcons
glob.LibTreasure_AddIcon = libTreasureAddIcon
