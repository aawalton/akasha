import "./public-api"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { finishPerfTrace, startPerfTrace } from "@akasha/temper-capture-perf/perf-trace"
import { createBrowseEngine } from "./browse-engine"
import { createBrowseWindow } from "./browse-window"
import { ADDON_NAME } from "./constants"
import { registerEvents } from "./events"
import { pruneExpiredListings } from "./prune"
import { getSavedVariables, initializeSavedVariables } from "./saved-variables"
import { createSellHelper } from "./sell-helper"
import { createSkipKioskDialog } from "./skip-kiosk-dialog"
import { createTraderKioskInfo } from "./trader-kiosk-info"

declare global {
  var TemperHud:
    | {
        registerCommand: (
          this: void,
          command: {
            name: string
            description: string
            addon: string
            handler?: (this: void, args: string) => undefined
          }
        ) => undefined
      }
    | undefined
}

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

function Initialize(): undefined {
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
  Initialize()
}

registerAddonInit(ADDON_NAME, initialize)
