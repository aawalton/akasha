import "./public-api"

import "./ic-the-next-boss/init"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "./constants"
import { OnAddOnLoaded } from "./events"

registerAddonInit(ADDON_NAME, OnAddOnLoaded)
