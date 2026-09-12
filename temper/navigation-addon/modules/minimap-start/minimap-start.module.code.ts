import { registerStrings } from "akasha/temper/navigation-addon/modules/minimap-ui-strings/minimap-ui-strings.module.code.ts"
import "akasha/temper/navigation-addon/modules/minimap-global/minimap-global.module.code.ts"
import "akasha/temper/navigation-addon/modules/minimap-core/minimap-core.module.code.ts"
import "akasha/temper/navigation-addon/modules/minimap-settings/minimap-settings.module.code.ts"

import { holder } from "akasha/temper/navigation-addon/modules/minimap-holder/minimap-holder.module.code.ts"

registerStrings()

export function initVotansMiniMap(this: void): undefined {
  holder.Initialize()
  holder.InitSettings()
  return undefined
}
