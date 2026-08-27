import { FCOCO as holder } from "./state"

declare global {
  var FCOCO: import("./state").FCOCO
}

globalThis.FCOCO = holder
