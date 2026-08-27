import { PotMaker as holder } from "./state"

declare global {
  var PotMaker: import("./state").PotMaker
}

globalThis.PotMaker = holder
