import "./public-api"

import "./leads/init"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { OnAddOnLoaded } from "./antiquities"
import { ADDON_NAME } from "./constants"

registerAddonInit(ADDON_NAME, OnAddOnLoaded)
