import { getAddonVersion } from "../lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "../lost-treasure-logger/lost-treasure-logger.module.code.ts"
import type { PinData } from "../lost-treasure-types/lost-treasure-types.module.code.ts"

const logger = createLogger("bugReport")

const BUG_REPORT_URL =
  "https://www.esoui.com/portal.php?id=283&a=bugreport&addonid=3227&title=%s&message=%s"

function getTitleString(this: void, data: PinData): string {
  const { itemId, itemName } = data
  const addonVersion = getAddonVersion()
  logger.Debug("addOnVersion: %d, itemId: %d, itemName: %s", addonVersion, itemId, itemName)
  return string.format(
    GetString(SI_LOST_TREASURE_BUGREPORT_PICKUP_TITLE),
    addonVersion,
    itemId,
    itemName
  )
}

function getMessageString(this: void, data: PinData): string {
  return string.format(
    GetString(SI_LOST_TREASURE_BUGREPORT_PICKUP_MESSAGE),
    getAddonVersion(),
    data.zone,
    data.mapId,
    data.x,
    data.y,
    data.lastOpenedTreasureMap,
    data.itemId,
    data.itemName
  )
}

function replaceSpecialCharacters(this: void, str: string): string {
  const [a] = string.gsub(str, "\n", "%%0A")
  const [b] = string.gsub(a, " ", "%%20")
  const [c] = string.gsub(b, "\u{00A0}", "%%20")
  return c
}

function getReportUrl(this: void, data: PinData): string {
  const title = getTitleString(data)
  const message = getMessageString(data)
  return replaceSpecialCharacters(string.format(BUG_REPORT_URL, title, message))
}

export function bugReportRequestOpenUrl(this: void, data: PinData): undefined {
  RequestOpenUnsafeURL(getReportUrl(data))
}
