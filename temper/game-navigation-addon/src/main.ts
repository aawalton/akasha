import "./public-api"

import "./custom-compass-pins/init"
import "./mappins/init"
import "./destinations/init"
import "./votans-minimap/init"

import { registerAddonInit } from "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"
import { ADDON_NAME } from "./constants"
import { OnAddOnLoaded } from "./events"

registerAddonInit(ADDON_NAME, OnAddOnLoaded)
