import {
  hideMiniMap,
  initializeMainControl,
  onMoveStop,
} from "../lost-treasure-opened-map/lost-treasure-opened-map.module.code.ts"

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
