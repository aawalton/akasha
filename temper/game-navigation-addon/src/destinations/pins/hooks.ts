import { DEST_PIN_TEXT_COLOR_ENGLISH_KEEP, DEST_PIN_TEXT_COLOR_ENGLISH_POI } from "../colors"
import { getSavedVariables } from "../saved-variables"
import { KeepsStore, PoiStore } from "./stores"

function AddEnglishName(pin: ZoMapPinObject): undefined {
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

export function HookPoiTooltips(): undefined {
  const seenEntry = ZO_MapPin.TOOLTIP_CREATORS[MAP_PIN_TYPE_POI_SEEN]
  if (seenEntry !== undefined) {
    const CreatorPOISeen = seenEntry.creator
    seenEntry.creator = function (this: void, pin: ZoMapPinObject, ...rest: unknown[]): undefined {
      CreatorPOISeen(pin, ...rest)
      AddEnglishName(pin)
    }
  }

  const completeEntry = ZO_MapPin.TOOLTIP_CREATORS[MAP_PIN_TYPE_POI_COMPLETE]
  if (completeEntry !== undefined) {
    const CreatorPOIComplete = completeEntry.creator
    completeEntry.creator = function (
      this: void,
      pin: ZoMapPinObject,
      ...rest: unknown[]
    ): undefined {
      CreatorPOIComplete(pin, ...rest)
      AddEnglishName(pin)
    }
  }
}

function asLabelControl(control: Control): LabelControl {
  return control as LabelControl
}

function AnchorTo(control: Control, anchorTo: Control): undefined {
  const [isValid, point, , relPoint, offsetX, offsetY] = control.GetAnchor(0)
  if (isValid) {
    control.ClearAnchors()
    control.SetAnchor(point, anchorTo, relPoint, offsetX, offsetY)
  }
}

function ModifyKeepTooltip(self: KeepTooltipControl, keepId: number): undefined {
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
        AnchorTo(guildLabel, englishLabel)
      }
    } else if (allianceLabel !== undefined) {
      AnchorTo(allianceLabel, englishLabel)
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
      AnchorTo(guildLabel, nameLabel)
    }
    self.height = self.height - lineHeight - 3
  }
  self.SetDimensions(self.width, self.height)
}

export function HookKeepTooltips(): undefined {
  const SetKeep = ZO_KeepTooltip.SetKeep
  ZO_KeepTooltip.SetKeep = function (
    this: KeepTooltipControl,
    keepId: number,
    ...rest: unknown[]
  ): undefined {
    SetKeep.call(this, keepId, ...rest)
    if (getSavedVariables().settings.AddEnglishOnKeeps) {
      ModifyKeepTooltip(this, keepId)
    }
  }

  const RefreshKeep = ZO_KeepTooltip.RefreshKeepInfo
  ZO_KeepTooltip.RefreshKeepInfo = function (
    this: KeepTooltipControl,
    ...rest: unknown[]
  ): undefined {
    RefreshKeep.call(this, ...rest)
    if (
      this.keepId != null &&
      this.battlegroundContext != null &&
      this.historyPercent != null &&
      getSavedVariables().settings.AddEnglishOnKeeps
    ) {
      ModifyKeepTooltip(this, this.keepId)
    }
  }
}
