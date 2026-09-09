import "../../addon-library-types/temper-hud-global/temper-hud-global.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-ttc/eso-ttc.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "../trading-globals/trading-globals.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/addon-init/addon-init.module.code.ts"
import {
  finishPerfTrace,
  startPerfTrace,
} from "akasha/temper/capture-perf/perf-trace/perf-trace.module.code.ts"
import { createBrowseEngine } from "../trading-browse-engine/trading-browse-engine.module.code.ts"
import { createBrowseWindow } from "../trading-browse-window/trading-browse-window.module.code.ts"
import { ADDON_NAME } from "../trading-constants/trading-constants.module.code.ts"
import { registerEvents } from "../trading-events/trading-events.module.code.ts"
import { pruneExpiredListings } from "../trading-prune/trading-prune.module.code.ts"
import {
  getSavedVariables,
  initializeSavedVariables,
} from "../trading-saved-variables/trading-saved-variables.module.code.ts"
import { createSellHelper } from "../trading-sell-helper/trading-sell-helper.module.code.ts"
import { createSkipKioskDialog } from "../trading-skip-kiosk-dialog/trading-skip-kiosk-dialog.module.code.ts"
import { createTraderKioskInfo } from "../trading-trader-kiosk-info/trading-trader-kiosk-info.module.code.ts"

function registerBrowseUi(this: void): undefined {
  const ns = `${ADDON_NAME}_Browse`
  const engine = createBrowseEngine({
    onComplete: function (this: void): undefined {
      window.show()
    },
  })
  const window = createBrowseWindow(engine)

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Open`,
    EVENT_OPEN_TRADING_HOUSE,
    function (this: void): undefined {
      window.show()
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Close`,
    EVENT_CLOSE_TRADING_HOUSE,
    function (this: void): undefined {
      window.hide()
      engine.stop()
    }
  )
}

function startAddon(): undefined {
  const perfStart = startPerfTrace()
  initializeSavedVariables()
  pruneExpiredListings()
  registerEvents()
  registerBrowseUi()
  createSellHelper().register()
  createSkipKioskDialog().register()
  createTraderKioskInfo().register()

  SLASH_COMMANDS["/temperlistings"] = function (this: void): undefined {
    const sv = getSavedVariables()
    let totalListings = 0
    for (const [guildName, guild] of Object.entries(sv.guilds)) {
      const count = Object.keys(guild.listings).length
      totalListings += count
      d(`[${ADDON_NAME}] ${guildName}: ${count} listings`)
    }
    d(`[${ADDON_NAME}] Total: ${totalListings} listings`)
  }

  globalThis.TemperHud?.registerCommand({
    name: "/temperlistings",
    description: "Print guild listing counts",
    addon: "TemperListings",
  })

  getSavedVariables().perf = finishPerfTrace(ADDON_NAME, perfStart)
}

function initialize(this: void): undefined {
  startAddon()
}

registerAddonInit(ADDON_NAME, initialize)
