import { hideMiniMap, initializeMainControl, onMoveStop } from "./lost-treasure"

declare global {
  var TemperLostTreasure: {
    OnInitialized: (this: void, control: Control) => undefined
    OnMoveStop: (this: void, control: Control) => undefined
    Hide: (this: void) => undefined
  }
}

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
