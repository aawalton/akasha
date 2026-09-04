import { UNKNOWN } from "../leads-location-types/leads-location-types.module.code.ts"
import { LOCATIONS } from "../leads-locations/leads-locations.module.code.ts"
import { STRINGS } from "../leads-ui-strings/leads-ui-strings.module.code.ts"

let lastAntiquityFound = 0
let editBoxContent = ""

export function getLastAntiquityFound(): number {
  return lastAntiquityFound
}

export function antiquityFound(this: void, _eventCode: number, antiquityId: number): undefined {
  lastAntiquityFound = antiquityId
  TemperLeadsMainWindowLocationURL.SetText(string.format(STRINGS.LABEL_URL_LEADFOUND, antiquityId))
  const entry = LOCATIONS[antiquityId]
  if (entry?.complete === true) {
    editBoxContent = STRINGS.EDITBOX_LOCATION_DATA_COMPLETE
  } else {
    editBoxContent = entry !== undefined ? entry.description : UNKNOWN
  }
  TemperLeadsLocationBox.SetText(editBoxContent)
}

export function transmogrify(this: void): undefined {
  if (lastAntiquityFound === 0) {
    editBoxContent = STRINGS.EDITBOX_NO_LEAD_FOUND_OR_SELECTED
  } else {
    let msg = string.format(
      "https://remosito.github.io/sendupdate.html?a=%d\\%s\\%s\\",
      lastAntiquityFound,
      ZO_CachedStrFormat("<<C:1>>", GetZoneNameById(GetAntiquityZoneId(lastAntiquityFound))),
      GetAntiquityName(lastAntiquityFound)
    )
    const locData = TemperLeadsLocationBox.GetText()
    if (locData === editBoxContent) {
      editBoxContent = STRINGS.EDITBOX_NOT_EDITED
    } else if (locData === "") {
      editBoxContent = STRINGS.EDITBOX_LOCDATA_EMPTY
    } else {
      const [escapedHash] = string.gsub(locData, "#", "%%23")
      const [escapedAmp] = string.gsub(escapedHash, "&", "%%26")
      const [escaped] = string.gsub(escapedAmp, '"', "%%27")
      msg = string.format("%s %s", msg, escaped)
      RequestOpenUnsafeURL(msg)
      editBoxContent = STRINGS.EDITBOX_THANKS
    }
  }
  TemperLeadsLocationBox.SetText(editBoxContent)
}
