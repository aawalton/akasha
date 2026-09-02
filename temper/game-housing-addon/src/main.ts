import "./public-api"

import "./ptf/init"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "./constants"
import { OnAddOnLoaded } from "./housing"

registerAddonInit(ADDON_NAME, OnAddOnLoaded)
