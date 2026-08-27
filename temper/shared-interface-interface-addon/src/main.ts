import "./public-api"

import "./no-thank-you/init"
import "./personal-assistant/init"
import "./fcochangestuff/init"

import { registerAddonInit } from "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"
import { ADDON_NAME } from "./constants"
import { OnAddOnLoaded } from "./events"

registerAddonInit(ADDON_NAME, OnAddOnLoaded)
