import "./public-api"

import "./ptf/init"

import { registerAddonInit } from "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"
import { ADDON_NAME } from "./constants"
import { OnAddOnLoaded } from "./housing"

registerAddonInit(ADDON_NAME, OnAddOnLoaded)
