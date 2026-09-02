import "./public-api"

import "./no-thank-you/init"
import "./personal-assistant/init"
import "./fcochangestuff/init"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "./constants"
import { OnAddOnLoaded } from "./events"

registerAddonInit(ADDON_NAME, OnAddOnLoaded)
