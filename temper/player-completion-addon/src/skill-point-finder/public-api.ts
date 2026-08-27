import { toggleWindow } from "./window"

export interface UspfApi {
  ToggleWindow: typeof toggleWindow
}

declare global {
  var USPF: UspfApi | undefined
}

globalThis.USPF = {
  ToggleWindow: toggleWindow,
}
