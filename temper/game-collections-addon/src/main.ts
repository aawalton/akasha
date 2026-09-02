import "./public-api"

import "./skyshards/init"
import "./lorebooks/init"
import "./losttreasure/init"
import "./dungeon-champions/init"
import "./item-browser/init"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "./constants"
import { OnAddOnLoaded } from "./events"

registerAddonInit(ADDON_NAME, OnAddOnLoaded)
