import "./public-api"

import "./leads/init"

import { registerAddonInit } from "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"
import { OnAddOnLoaded } from "./antiquities"
import { ADDON_NAME } from "./constants"

registerAddonInit(ADDON_NAME, OnAddOnLoaded)
