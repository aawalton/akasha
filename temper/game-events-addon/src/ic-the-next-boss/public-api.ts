import { ICT as holder } from "./state"

declare global {
  var ICT: import("./state").Ict
}

globalThis.ICT = holder
