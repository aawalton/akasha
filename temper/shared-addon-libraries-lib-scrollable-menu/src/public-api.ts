import "./code"
import "./api"
import "./api-entries"
import "./api-show"
import "./api-refresh"

import { LSM_UPDATE_MODE_BOTH, LSM_UPDATE_MODE_MAINMENU, LSM_UPDATE_MODE_SUBMENU } from "./constants-core"
import { lib } from "./lib-state"

globalThis.LibScrollableMenu = lib

_G.LSM_UPDATE_MODE_MAINMENU = LSM_UPDATE_MODE_MAINMENU
_G.LSM_UPDATE_MODE_SUBMENU = LSM_UPDATE_MODE_SUBMENU
_G.LSM_UPDATE_MODE_BOTH = LSM_UPDATE_MODE_BOTH

for (const [key, value] of pairs(lib.scrollListRowTypes)) {
  _G[key] = value
}

for (const [key, value] of pairs(lib.scrollListRowHighlights)) {
  _G[key] = value
}

declare global {
  var LibScrollableMenu: Lib
}
