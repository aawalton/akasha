import "akasha/temper/lib-scrollable-menu/scrollable-menu-code-bootstrap/scrollable-menu-code-bootstrap.module.code.ts"
import "akasha/temper/lib-scrollable-menu/scrollable-menu-api-core/scrollable-menu-api-core.module.code.ts"
import "akasha/temper/lib-scrollable-menu/scrollable-menu-api-entries/scrollable-menu-api-entries.module.code.ts"
import "akasha/temper/lib-scrollable-menu/scrollable-menu-api-show/scrollable-menu-api-show.module.code.ts"
import "akasha/temper/lib-scrollable-menu/scrollable-menu-api-refresh/scrollable-menu-api-refresh.module.code.ts"

import {
  LSM_UPDATE_MODE_BOTH,
  LSM_UPDATE_MODE_MAINMENU,
  LSM_UPDATE_MODE_SUBMENU,
} from "akasha/temper/lib-scrollable-menu/scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "akasha/temper/lib-scrollable-menu/scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

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
