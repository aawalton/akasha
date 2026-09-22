import {
  hideMiniMap,
  initializeMainControl,
  onMoveStop,
} from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-opened-map/lost-treasure-opened-map.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/catalog/world/lost-treasure/lost-treasure-global-declarations/lost-treasure-global-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

globalThis.TemperWorldLostTreasure = {
  OnInitialized: (control: Control): undefined => {
    initializeMainControl(control)
  },
  OnMoveStop: (): undefined => {
    onMoveStop()
  },
  Hide: (): undefined => {
    hideMiniMap()
  },
}
