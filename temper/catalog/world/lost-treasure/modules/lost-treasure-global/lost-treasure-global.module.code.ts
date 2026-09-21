import {
  hideMiniMap,
  initializeMainControl,
  onMoveStop,
} from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-opened-map/lost-treasure-opened-map.module.code.ts"
import "akasha/temper/addon/crafting-addon/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"

globalThis.TemperLostTreasure = {
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
