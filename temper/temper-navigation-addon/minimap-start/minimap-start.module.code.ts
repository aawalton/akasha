import { registerStrings } from "../minimap-ui-strings/minimap-ui-strings.module.code.ts"
import "../minimap-global/minimap-global.module.code.ts"
import "../minimap-core/minimap-core.module.code.ts"
import "../minimap-settings/minimap-settings.module.code.ts"

import { holder } from "../minimap-holder/minimap-holder.module.code.ts"

registerStrings()

export function initVotansMiniMap(this: void): undefined {
  holder.Initialize()
  holder.InitSettings()
  return undefined
}
