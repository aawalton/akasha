import {
  DEST_PIN_TEXT_COLOR_ENGLISH_KEEP,
  DEST_PIN_TEXT_COLOR_ENGLISH_POI,
} from "../destinations-colors/destinations-colors.module.code.ts"
import {
  KeepsStore,
  PoiStore,
} from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { getSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

function addEnglishName(pin: ZoMapPinObject): undefined {
  const sv = getSavedVariables()
  if (sv.settings.AddEnglishOnUnknwon) {
    const zoneId = GetZoneId(pin.GetPOIZoneIndex())
    const poiIndex = pin.GetPOIIndex()

    const mapData = PoiStore[zoneId]

    const poiEntry = mapData !== undefined ? mapData[poiIndex] : undefined
    if (poiEntry !== undefined) {
      const englishName = poiEntry.n
      const localizedName = ZO_WorldMapMouseoverName.GetText()
      ZO_WorldMapMouseoverName.SetText(
        zo_strformat(
          "<<1>>\n<<2>>",
          localizedName,
          DEST_PIN_TEXT_COLOR_ENGLISH_POI.Colorize(englishName)
        )
      )
    }
  }
}

export function hookPoiTooltips(): undefined {
  const seenEntry = ZO_MapPin.TOOLTIP_CREATORS[MAP_PIN_TYPE_POI_SEEN]
  if (seenEntry !== undefined) {
    const creatorPoiSeen = seenEntry.creator
    seenEntry.creator = function (this: void, pin: ZoMapPinObject, ...rest: unknown[]): undefined {
      creatorPoiSeen(pin, ...rest)
      addEnglishName(pin)
    }
  }

  const completeEntry = ZO_MapPin.TOOLTIP_CREATORS[MAP_PIN_TYPE_POI_COMPLETE]
  if (completeEntry !== undefined) {
    const creatorPoiComplete = completeEntry.creator
    completeEntry.creator = function (
      this: void,
      pin: ZoMapPinObject,
      ...rest: unknown[]
    ): undefined {
      creatorPoiComplete(pin, ...rest)
      addEnglishName(pin)
    }
  }
}

function asLabelControl(control: Control): LabelControl {
  return control as LabelControl
}

function anchorTo(control: Control, anchorTo: Control): undefined {
  const [isValid, point, , relPoint, offsetX, offsetY] = control.GetAnchor(0)
  if (isValid) {
    control.ClearAnchors()
    control.SetAnchor(point, anchorTo, relPoint, offsetX, offsetY)
  }
}

function modifyKeepTooltip(self: KeepTooltipControl, keepId: number): undefined {
  const sv = getSavedVariables()
  const keepName = GetKeepName(keepId)
  const englishKeepName = KeepsStore[keepId]
  const nameChild = self.GetNamedChild("Name")
  const nameLabel = nameChild !== undefined ? asLabelControl(nameChild) : undefined
  let allianceLabel: Control | undefined
  let guildLabel: Control | undefined
  let englishLabel: LabelControl | undefined
  let lineHeight: number

  if (self.lastLine !== undefined && nameLabel !== undefined) {
    let lastLine: Control | undefined = self.lastLine
    let previousLine: Control | undefined
    while (lastLine !== undefined) {
      const [, , anchoredTo] = lastLine.GetAnchor(0)
      if (anchoredTo === nameLabel) {
        allianceLabel = lastLine
        guildLabel = previousLine
        break
      }
      previousLine = lastLine
      lastLine = anchoredTo
    }
  }

  if (englishKeepName !== undefined && nameLabel !== undefined && sv.settings.AddNewLineOnKeeps) {
    const [acquiredLabel] = self.linePool.AcquireObject()
    englishLabel = acquiredLabel
    englishLabel.SetHidden(false)
    englishLabel.SetText(DEST_PIN_TEXT_COLOR_ENGLISH_KEEP.Colorize(englishKeepName))
    englishLabel.SetAnchor(TOPLEFT, nameLabel, BOTTOMLEFT, 0, 3)
    lineHeight = englishLabel.GetHeight()
    const svRoot: Record<string, unknown> = sv
    const hideAllianceRootLevel = svRoot["HideAllianceOnKeeps"]
    if (
      hideAllianceRootLevel != null &&
      hideAllianceRootLevel !== false &&
      allianceLabel !== undefined
    ) {
      allianceLabel.SetHidden(true)
      if (guildLabel !== undefined) {
        anchorTo(guildLabel, englishLabel)
      }
    } else if (allianceLabel !== undefined) {
      anchorTo(allianceLabel, englishLabel)
      self.height = self.height + lineHeight + 3
    } else {
      self.height = self.height + lineHeight + 3
    }
    const width = englishLabel.GetTextWidth() + 16
    if (width > self.width) {
      self.width = width
    }
  } else if (englishKeepName !== undefined && nameLabel !== undefined) {
    nameLabel.SetText(
      zo_strformat(
        "<<1>> (<<2>>)",
        keepName,
        DEST_PIN_TEXT_COLOR_ENGLISH_KEEP.Colorize(englishKeepName)
      )
    )
    const width = nameLabel.GetTextWidth() + 16
    if (width > self.width) {
      self.width = width
    }
  }

  if (
    sv.settings.HideAllianceOnKeeps &&
    allianceLabel !== undefined &&
    englishLabel === undefined &&
    nameLabel !== undefined
  ) {
    lineHeight = allianceLabel.GetHeight()
    allianceLabel.SetHidden(true)
    if (guildLabel !== undefined) {
      anchorTo(guildLabel, nameLabel)
    }
    self.height = self.height - lineHeight - 3
  }
  self.SetDimensions(self.width, self.height)
}

export function hookKeepTooltips(): undefined {
  const setKeep = ZO_KeepTooltip.SetKeep
  ZO_KeepTooltip.SetKeep = function (
    this: KeepTooltipControl,
    keepId: number,
    ...rest: unknown[]
  ): undefined {
    setKeep.call(this, keepId, ...rest)
    if (getSavedVariables().settings.AddEnglishOnKeeps) {
      modifyKeepTooltip(this, keepId)
    }
  }

  const refreshKeep = ZO_KeepTooltip.RefreshKeepInfo
  ZO_KeepTooltip.RefreshKeepInfo = function (
    this: KeepTooltipControl,
    ...rest: unknown[]
  ): undefined {
    refreshKeep.call(this, ...rest)
    if (
      this.keepId != null &&
      this.battlegroundContext != null &&
      this.historyPercent != null &&
      getSavedVariables().settings.AddEnglishOnKeeps
    ) {
      modifyKeepTooltip(this, this.keepId)
    }
  }
}
