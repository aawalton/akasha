import { registerStrings } from "./ui-strings"
import "./public-api"
import "./core"
import "./settings"

import { holder } from "./holder"

registerStrings()

export function initVotansMiniMap(this: void): undefined {
  holder.Initialize()
  holder.InitSettings()
  return undefined
}
