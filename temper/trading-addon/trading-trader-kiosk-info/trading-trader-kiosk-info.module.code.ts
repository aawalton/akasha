import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-objects-02"
import "@akasha/temper-eso-types/eso-ui"
import { ADDON_NAME } from "../trading-constants/trading-constants.module.code.ts"

const WINDOW_NAME = "TemperListingsTraderInfo"
const WINDOW_WIDTH = 280
const LABEL_HEIGHT = 22
const PAD = 8

export interface TraderKioskInfo {
  register: (this: void) => undefined
}

export function createTraderKioskInfo(this: void): TraderKioskInfo {
  return {
    register(): undefined {
      mountTraderInfo()
    },
  }
}

function mountTraderInfo(this: void): undefined {
  const ns = `${ADDON_NAME}_TraderInfo`
  const widgets = buildInfoWindow()

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Open`,
    EVENT_OPEN_TRADING_HOUSE,
    function (this: void): undefined {
      const [, guildName] = GetCurrentTradingHouseGuildDetails()
      if (guildName === undefined || guildName === "") {
        widgets.tlw.SetHidden(true)
        return
      }
      widgets.label.SetText(`Trader owned by: ${zo_strformat("<<1>>", guildName)}`)
      widgets.tlw.SetHidden(false)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Close`,
    EVENT_CLOSE_TRADING_HOUSE,
    function (this: void): undefined {
      widgets.tlw.SetHidden(true)
    }
  )
}

interface InfoWidgets {
  readonly tlw: TopLevelWindow
  readonly label: LabelControl
}

function buildInfoWindow(this: void): InfoWidgets {
  const existing = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(WINDOW_NAME)
  if (existing !== undefined) existing.SetHidden(true)

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(WINDOW_NAME)
  tlw.SetHidden(true)
  tlw.SetClampedToScreen(true)
  tlw.SetMovable(true)
  tlw.SetDimensions(WINDOW_WIDTH, LABEL_HEIGHT + PAD * 2)
  tlw.ClearAnchors()
  tlw.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, 80, 360)

  const bg = WINDOW_MANAGER.CreateControl("$(parent)BG", tlw, CT_BACKDROP)
  bg.SetAnchorFill()
  bg.SetCenterColor(0, 0, 0, 0.7)
  bg.SetEdgeColor(0, 0, 0, 0)
  bg.SetEdgeTexture(undefined, 1, 1, 1)

  const label = WINDOW_MANAGER.CreateControl(`${WINDOW_NAME}Label`, tlw, CT_LABEL)
  label.SetAnchor(TOPLEFT, tlw, TOPLEFT, PAD, PAD)
  label.SetDimensions(WINDOW_WIDTH - PAD * 2, LABEL_HEIGHT)
  label.SetFont("$(BOLD_FONT)|16|shadow")
  label.SetColor(1, 1, 1, 1)
  label.SetHorizontalAlignment(TEXT_ALIGN_LEFT)

  return { tlw, label }
}
