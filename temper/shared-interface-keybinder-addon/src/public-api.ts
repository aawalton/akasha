import { toggleShareState } from "./share"

export interface TemperKeybinderGlobal {
  ToggleShareState: (this: void) => void
}

declare global {
  var TemperKeybinder: TemperKeybinderGlobal
}

globalThis.TemperKeybinder = { ToggleShareState: toggleShareState }
