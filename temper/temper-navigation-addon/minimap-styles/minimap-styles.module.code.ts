import {
  asAnyTable,
  asMiniMapControl,
  asNumber,
} from "../minimap-casts/minimap-casts.module.code.ts"
import { holder } from "../minimap-holder/minimap-holder.module.code.ts"

const self = holder

self.AddBorderStyle(
  "Default",
  "Default",
  function (
    this: void,
    settingsArg: unknown,
    backgroundArg: unknown,
    frameArg: unknown
  ): undefined {
    const settings = asAnyTable(settingsArg)
    const background = asMiniMapControl(backgroundArg)
    const frame = asMiniMapControl(frameArg)
    const alpha = asNumber(settings.borderAlpha) / 100
    background.SetCenterColor(0, 0, 0, alpha)
    background.SetEdgeColor(0, 0, 0, 0)
    background.SetCenterTexture("")
    background.SetInsets(0, 0, 0, 0)
    frame.SetEdgeTexture("/esoui/art/worldmap/worldmap_frame_edge.dds", 128, 16)
    frame.SetAlpha(1)
    frame.SetHidden(false)
  },
  undefined
)

self.AddBorderStyle(
  "ESO",
  "ESO Style",
  function (
    this: void,
    settingsArg: unknown,
    backgroundArg: unknown,
    frameArg: unknown
  ): undefined {
    const settings = asAnyTable(settingsArg)
    const background = asMiniMapControl(backgroundArg)
    const frame = asMiniMapControl(frameArg)
    const alpha = asNumber(settings.borderAlpha) / 100
    background.SetCenterColor(0, 0, 0, alpha)
    background.SetEdgeColor(0, 0, 0, alpha)
    background.SetEdgeTexture("/esoui/art/chatwindow/chat_bg_edge.dds", 256, 128, 16)
    background.SetCenterTexture("/esoui/art/chatwindow/chat_bg_center.dds")
    background.SetInsets(16, 16, -16, -16)
    frame.SetEdgeTexture("TemperNavigation/WorldMapFrame.dds", 128, 16, 32)
    frame.SetAlpha(1)
    frame.SetHidden(false)
  },
  undefined
)

self.AddBorderStyle(
  "Flat",
  "Flat",
  function (
    this: void,
    settingsArg: unknown,
    backgroundArg: unknown,
    frameArg: unknown
  ): undefined {
    const settings = asAnyTable(settingsArg)
    const background = asMiniMapControl(backgroundArg)
    const frame = asMiniMapControl(frameArg)
    const alpha = asNumber(settings.borderAlpha) / 100
    background.SetCenterColor(0, 0, 0, alpha)
    background.SetEdgeColor(0, 0, 0, 0)
    background.SetCenterTexture("")
    background.SetInsets(0, 0, 0, 0)
    frame.SetHidden(true)
  },
  undefined
)

self.AddBorderStyle(
  "Gamepad",
  "Gamepad",
  function (
    this: void,
    settingsArg: unknown,
    backgroundArg: unknown,
    frameArg: unknown
  ): undefined {
    const settings = asAnyTable(settingsArg)
    const background = asMiniMapControl(backgroundArg)
    const frame = asMiniMapControl(frameArg)
    const alpha = asNumber(settings.borderAlpha) / 100
    background.SetCenterColor(0, 0, 0, alpha)
    background.SetEdgeColor(0, 0, 0, 0)
    background.SetCenterTexture("")
    background.SetInsets(0, 0, 0, 0)
    frame.SetEdgeTexture("esoui/art/miscellaneous/gamepad/edgeframegamepadborder.dds", 128, 16)
    frame.SetAlpha(1)
    frame.SetHidden(false)
  },
  undefined
)

self.AddBorderStyle(
  "Modern",
  "Modern",
  function (
    this: void,
    settingsArg: unknown,
    backgroundArg: unknown,
    frameArg: unknown
  ): undefined {
    const settings = asAnyTable(settingsArg)
    const background = asMiniMapControl(backgroundArg)
    const frame = asMiniMapControl(frameArg)
    const alpha = asNumber(settings.borderAlpha) / 100
    background.SetCenterColor(0.5, 0.5, 0.5, alpha)
    background.SetEdgeColor(0, 0, 0, 0)
    background.SetCenterTexture("")
    background.SetInsets(11, 6, -9, -10)
    background.SetAnchor(BOTTOMRIGHT, undefined, BOTTOMRIGHT, 6, -30)
    frame.SetEdgeTexture("", 128, 16)
    frame.SetAlpha(0)
    frame.SetHidden(false)
  },
  function (
    this: void,
    _settingsArg: unknown,
    backgroundArg: unknown,
    _frameArg: unknown
  ): undefined {
    const background = asMiniMapControl(backgroundArg)
    background.SetAnchor(BOTTOMRIGHT, undefined, BOTTOMRIGHT, 6, 0)
  }
)

self.AddFont("", "None")

self.AddFont("MEDIUM_FONT", "Keyboard Medium")
self.AddFont("BOLD_FONT", "Keyboard Bold")
self.AddFont("CHAT_FONT", "Keyboard Chat")

self.AddFont("GAMEPAD_LIGHT_FONT", "Gamepad Light")
self.AddFont("GAMEPAD_MEDIUM_FONT", "Gamepad Medium")
self.AddFont("GAMEPAD_BOLD_FONT", "Gamepad Bold")

self.AddFont("ANTIQUE_FONT", "Antique")
self.AddFont("HANDWRITTEN_FONT", "Handwritten")
self.AddFont("STONE_TABLET_FONT", "Stone Tablet")

self.AddFontSize(12, "Smaller", 7)
self.AddFontSize(15, "Small", 6)
self.AddFontSize(16, "Medium", 4)
self.AddFontSize(19, "Large", 2)
self.AddFontSize(22, "Huge", 2)
