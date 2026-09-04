import { dropdown, valueDropdown } from "@akasha/temper-settings-panel/dropdown"
import { header } from "@akasha/temper-settings-panel/header"
import {
  asAnyTableMember,
  asBoolean,
  asColorDef,
  asMiniMapControl,
  asNumber,
  asString,
} from "../minimap-casts/minimap-casts.module.code.ts"
import type { VotansMiniMap } from "../minimap-holder/minimap-holder.module.code.ts"
import { LOOKUP } from "../minimap-map-settings/minimap-map-settings.module.code.ts"

const async = LibAsync

export function buildAppearanceSettings(self: VotansMiniMap): LamControlData[] {
  const controls: LamControlData[] = []

  controls.push(
    valueDropdown<string>({
      name: GetString(SI_VOTANSMINIMAP_BORDER_STYLE),
      choices: LOOKUP.frameStyles.map((s) => s.name),
      values: LOOKUP.frameStyles.map((s) => s.data.value),
      get: () => self.account.frameStyle,
      set: (v) => {
        if (self.account.frameStyle !== v) {
          const style = LOOKUP.frameToFile[self.account.frameStyle]
          if (style != null && style.data.reset != null) {
            style.data.reset(self.account, self.background, ZO_WorldMapMapFrame)
          }
          self.account.frameStyle = v
          self.UpdateBorder()
        }
      },
      default: self.accountDefaults.frameStyle,
    })
  )
  controls.push({
    type: "slider",
    name: GetString(SI_VOTANSMINIMAP_BORDER_OPACITY),
    tooltip: GetString(SI_VOTANSMINIMAP_BORDER_OPACITY_TOOLTIP),
    min: 0,
    max: 100,
    step: 1,
    decimals: 0,
    default: self.accountDefaults.borderAlpha,
    getFunc: () => self.account.borderAlpha,
    setFunc: (value) => {
      self.account.borderAlpha = asNumber(value)
      self.UpdateBorder()
    },
  })
  controls.push(
    valueDropdown<string>({
      name: GetString(SI_VOTANSMINIMAP_TITLE_FONT),
      choices: LOOKUP.fonts.map((f) => f.name),
      values: LOOKUP.fonts.map((f) => f.data),
      get: () => self.account.titleFont,
      set: (v) => {
        self.account.titleFont = v
        self.UpdateBorder()
      },
      default: self.accountDefaults.titleFont,
    })
  )
  controls.push(
    valueDropdown<number>({
      name: GetString(SI_VOTANSMINIMAP_TITLE_FONT_SIZE),
      choices: LOOKUP.fontSizes.map((s) => s.name),
      values: LOOKUP.fontSizes.map((s) => s.data.size),
      get: () => self.account.titleFontSize,
      set: (v) => {
        self.account.titleFontSize = v
        self.lastTitleFont = ""
        self.UpdateBorder()
      },
      default: self.accountDefaults.titleFontSize,
    })
  )
  controls.push({
    type: "colorpicker",
    name: GetString(SI_VOTANSMINIMAP_TITLE_COLOR),
    default: self.accountDefaults.titleColor,
    getFunc: () => {
      return asColorDef(self.titleColor).UnpackRGB()
    },
    setFunc: (newR, newG, newB, _newA) => {
      if (self.titleColor != null) {
        asColorDef(self.titleColor).SetRGB(newR, newG, newB)
        const [r2, g2, b2] = self.titleColor.UnpackRGB()
        self.account.titleColor = [r2, g2, b2]
      }
      self.UpdateBorder()
    },
  })
  controls.push(
    dropdown({
      name: GetString(SI_VOTANSMINIMAP_TITLE_POSITION),
      choices: ["Top", "Bottom"],
      get: () => (self.account.titleAtTop ? 0 : 1),
      set: (i) => {
        self.account.titleAtTop = i === 0
        self.UpdateBorder()
      },
      defaultIndex: self.accountDefaults.titleAtTop ? 0 : 1,
    })
  )
  controls.push({
    type: "checkbox",
    name: GetString(SI_VOTANSMINIMAP_SHOW_FULL_TITLE),
    tooltip: GetString(SI_VOTANSMINIMAP_SHOW_FULL_TITLE_TOOLTIP),
    default: self.accountDefaults.showFullTitle,
    getFunc: () => self.account.showFullTitle,
    setFunc: (value) => {
      self.account.showFullTitle = asBoolean(value)
      ZO_WorldMapTitle.SetText(
        asString(ZO_WorldMap_GetMapTitle(GetPlayerLocationName(), GetPlayerActiveSubzoneName()))
      )
    },
  })
  controls.push({
    type: "checkbox",
    name: GetString(SI_VOTANSMINIMAP_KEEP_SQUARE),
    tooltip: GetString(SI_VOTANSMINIMAP_KEEP_SQUARE_TOOLTIP),
    default: true,
    getFunc: () => asBoolean(self.modeData?.keepSquare),
    setFunc: (value) => {
      self.account.keepSquare = asBoolean(value)
      if (self.modeData != null) {
        self.modeData.keepSquare = asAnyTableMember(value)
      }
    },
  })
  controls.push(
    dropdown({
      name: GetString(SI_VOTANSMINIMAP_SHOW_CLOCK),
      tooltip: GetString(SI_VOTANSMINIMAP_SHOW_CLOCK_TOOLTIP),
      choices: [
        GetString(SI_VOTANSMINIMAP_SHOW_CLOCK0),
        GetString(SI_VOTANSMINIMAP_SHOW_CLOCK1),
        GetString(SI_VOTANSMINIMAP_SHOW_CLOCK2),
        GetString(SI_VOTANSMINIMAP_SHOW_CLOCK3),
      ],
      get: () => {
        let mode = 0
        if (self.account.showRealTimeClock) {
          mode = mode + 1
        }
        if (self.account.showInGameClock) {
          mode = mode + 2
        }
        if (mode < 0 || mode > 3) {
          return 3
        }
        return mode
      },
      set: (i) => {
        const pairs: [boolean, boolean][] = [
          [false, false],
          [true, false],
          [false, true],
          [true, true],
        ]
        const pair = pairs[i] ?? [true, true]
        self.account.showRealTimeClock = pair[0]
        self.account.showInGameClock = pair[1]
        self.account.showClock = pair[0] || pair[1]
        self.UpdateBorder()
      },
      defaultIndex: 3,
    })
  )
  controls.push(
    valueDropdown<number>({
      name: GetString(SI_VOTANSMINIMAP_TIME_FORMAT),
      choices: ["12h", "24h"],
      values: [TIME_FORMAT_PRECISION_TWELVE_HOUR, TIME_FORMAT_PRECISION_TWENTY_FOUR_HOUR],
      get: () => self.account.timeFormat,
      set: (v) => {
        self.account.timeFormat = v
      },
      default: self.accountDefaults.timeFormat,
    })
  )
  controls.push({
    type: "checkbox",
    name: GetString(SI_VOTANSMINIMAP_SHOW_CAMERA_HEADING),
    tooltip: GetString(SI_VOTANSMINIMAP_SHOW_CAMERA_HEADING_TOOLTIP),
    default: self.accountDefaults.showCameraAngle,
    getFunc: () => self.account.showCameraAngle,
    setFunc: (value) => {
      self.account.showCameraAngle = asBoolean(value)
      if (asBoolean(value)) {
        self.InitCameraAngle()
      }
      self.cameraAngle = 0
      if (self.cameraAngleLeft != null) {
        asMiniMapControl(self.cameraAngleLeft).SetHidden(!asBoolean(value))
        if (self.cameraAngleRight != null) {
          asMiniMapControl(self.cameraAngleRight).SetHidden(!asBoolean(value))
        }
      }
    },
  })
  controls.push({
    type: "slider",
    name: " |u12:0::|u" + GetString(SI_VOTANSMINIMAP_CAMERA_HEADING_ANGLE),
    tooltip: GetString(SI_VOTANSMINIMAP_CAMERA_HEADING_ANGLE_TOOLTIP),
    min: 20,
    max: 70,
    step: 1,
    decimals: 0,
    default: self.accountDefaults.cameraAngle,
    getFunc: () => self.account.cameraAngle,
    setFunc: (value) => {
      self.account.cameraAngle = asNumber(value)
      self.cameraAngleRad = asNumber(value) * 0.0174532925199
    },
    disabled: () => !self.account.showCameraAngle,
  })
  controls.push(
    valueDropdown<string>({
      name: GetString(SI_VOTANSMINIMAP_ZONE_CHANGE_ALERT),
      choices: [
        GetString(SI_VOTANSMINIMAP_ZONEALERTMODE_ALWAYS),
        GetString(SI_VOTANSMINIMAP_ZONEALERTMODE_MAP_HIDDEN),
        GetString(SI_VOTANSMINIMAP_ZONEALERTMODE_NEVER),
      ],
      values: [
        self.zoneAlertMode.Always,
        self.zoneAlertMode.MiniMapHidden,
        self.zoneAlertMode.Never,
      ],
      get: () => self.account.zoneAlertMode,
      set: (v) => {
        self.account.zoneAlertMode = v
      },
      default: self.accountDefaults.zoneAlertMode,
    })
  )
  controls.push(
    valueDropdown<string>({
      name: GetString(SI_VOTANSMINIMAP_SHOW_COMPASS),
      tooltip: GetString(SI_VOTANSMINIMAP_SHOW_COMPASS_TOOLTIP),
      choices: [
        GetString(SI_VOTANSMINIMAP_COMPASSMODE_UNTOUCHED),
        GetString(SI_VOTANSMINIMAP_COMPASSMODE_HIDDEN),
        GetString(SI_VOTANSMINIMAP_COMPASSMODE_SHOWN),
      ],
      values: [self.compassMode.Untouched, self.compassMode.Hidden, self.compassMode.Shown],
      get: () => self.account.enableCompass,
      set: (v) => {
        self.account.enableCompass = v
        self.UpdateCompass()
      },
      default: self.accountDefaults.enableCompass,
    })
  )
  controls.push({
    type: "checkbox",
    name: GetString(SI_VOTANSMINIMAP_SHOW_ON_TOP),
    tooltip: GetString(SI_VOTANSMINIMAP_SHOW_ON_TOP_TOOLTIP),
    default: self.accountDefaults.showOnTop,
    getFunc: () => self.account.showOnTop,
    setFunc: (value) => {
      self.account.showOnTop = asBoolean(value)
      self.UpdateDrawLevel()
    },
  })
  controls.push({
    type: "checkbox",
    name: GetString(SI_VOTANSMINIMAP_SHOW_ALL_TRAVEL_NODES),
    tooltip: GetString(SI_VOTANSMINIMAP_SHOW_ALL_TRAVEL_NODES_TOOLTIP),
    default: self.accountDefaults.showAllTravelNodes,
    getFunc: () => self.account.showAllTravelNodes,
    setFunc: (value) => {
      self.account.showAllTravelNodes = asBoolean(value)
    },
  })
  controls.push(header(GetString(SI_VOTANSMINIMAP_FRAMEDROP_DEBUG)))
  controls.push({
    type: "checkbox",
    name: GetString(SI_VOTANSMINIMAP_SHOW_FREEZE_WARNING),
    tooltip: GetString(SI_VOTANSMINIMAP_SHOW_FREEZE_WARNING_TOOLTIP),
    default: false,
    getFunc: () => async.GetDebug(),
    setFunc: (value) => {
      self.account.debug = asBoolean(value)
      async.SetDebug(asBoolean(value))
    },
  })

  return controls
}
