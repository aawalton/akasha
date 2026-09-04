import {
  asAnyTable,
  asBoolean,
  asMiniMapScene,
  asNumber,
  asScene,
  asSceneFragment,
} from "../minimap-casts/minimap-casts.module.code.ts"
import type { VotansMiniMap } from "../minimap-holder/minimap-holder.module.code.ts"
import type { LooseTable } from "../minimap-view-types/minimap-view-types.module.code.ts"

export function buildLocationSettings(self: VotansMiniMap): LamControlData[] {
  let scene: LooseTable = asAnyTable(undefined)
  function addMap(this: void): undefined {
    if (self.wasMapAdded) {
      return
    }
    scene = asAnyTable(SCENE_MANAGER.GetCurrentScene())
    asScene(scene).AddFragment(asSceneFragment(WORLD_MAP_FRAGMENT))
    self.settingsScene = scene
    self.wasMapAdded = true
    asMiniMapScene(WORLD_MAP_FRAGMENT).Refresh()
  }
  function removeMap(this: void): undefined {
    if (!self.wasMapAdded) {
      return
    }
    asScene(scene).RemoveFragment(asSceneFragment(WORLD_MAP_FRAGMENT))
    self.wasMapAdded = false
    self.UpdateBorder()
    asMiniMapScene(WORLD_MAP_FRAGMENT).Refresh()
  }

  const [w0, h0] = GuiRoot.GetDimensions()
  const w = w0 / 8
  const h = h0 / 8
  const w2 = w * 0.5
  const h2 = h * 0.5
  const sizeDefault = 304 / 8
  const xDefault = math.floor(w2 - sizeDefault / 2)
  const yDefault = math.floor(h2 - sizeDefault / 2)

  return [
    {
      type: "checkbox",
      name: GetString(SI_VOTANSMINIMAP_SHOW_IN_SETTINGS),
      default: false,
      getFunc: () => self.wasMapAdded ?? false,
      setFunc: (value) => {
        if (value) {
          addMap()
        } else {
          removeMap()
        }
      },
    },
    {
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_GRID_X),
      tooltip: GetString(SI_VOTANSMINIMAP_GRID_TOOLTIP),
      min: -w2,
      max: w2,
      step: 1,
      decimals: 0,
      default: xDefault,
      getFunc: () => math.floor(asNumber(self.account.x) / 8),
      setFunc: (value) => {
        self.account.x = asNumber(value) * 8
        self.RestorePosition()
      },
    },
    {
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_GRID_Y),
      tooltip: GetString(SI_VOTANSMINIMAP_GRID_TOOLTIP),
      min: -h2,
      max: h2,
      step: 1,
      decimals: 0,
      default: yDefault,
      getFunc: () => math.floor(asNumber(self.account.y) / 8),
      setFunc: (value) => {
        self.account.y = asNumber(value) * 8
        self.RestorePosition()
      },
    },
    {
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_GRID_W),
      tooltip: GetString(SI_VOTANSMINIMAP_GRID_TOOLTIP),
      min: 14,
      max: w,
      step: 1,
      decimals: 0,
      default: sizeDefault,
      getFunc: () => math.floor(ZO_WorldMapScroll.GetWidth() / 8),
      setFunc: (rawValue) => {
        const value = asNumber(rawValue) * 8
        self.account.width = ZO_WorldMap.GetWidth() - ZO_WorldMapScroll.GetWidth() + value
        ZO_WorldMapScroll.SetWidth(value)
        const modeData = asAnyTable(self.modeData)
        if (asBoolean(modeData.keepSquare)) {
          self.account.height = ZO_WorldMap.GetHeight() - ZO_WorldMapScroll.GetHeight() + value
          ZO_WorldMapScroll.SetHeight(value)
        }
        self.RestorePosition()
      },
    },
    {
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_GRID_H),
      tooltip: GetString(SI_VOTANSMINIMAP_GRID_TOOLTIP),
      min: 14,
      max: h,
      step: 1,
      decimals: 0,
      default: sizeDefault,
      getFunc: () => {
        const modeData = asAnyTable(self.modeData)
        return math.floor(
          (asBoolean(modeData.keepSquare)
            ? ZO_WorldMapScroll.GetWidth()
            : ZO_WorldMapScroll.GetHeight()) / 8
        )
      },
      setFunc: (rawValue) => {
        const value = asNumber(rawValue) * 8
        self.account.height = ZO_WorldMap.GetHeight() - ZO_WorldMapScroll.GetHeight() + value
        ZO_WorldMapScroll.SetHeight(value)
        const modeData = asAnyTable(self.modeData)
        if (asBoolean(modeData.keepSquare)) {
          self.account.width = ZO_WorldMap.GetWidth() - ZO_WorldMapScroll.GetWidth() + value
          ZO_WorldMapScroll.SetWidth(value)
        }
        self.RestorePosition()
      },
    },
  ]
}
