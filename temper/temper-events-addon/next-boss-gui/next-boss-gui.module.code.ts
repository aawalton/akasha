import "@akasha/temper-eso-types/eso-api-2"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-world-map-pins"
import "@akasha/temper-eso-types/eso-world-map-zoom"

import { MAP_ID_IMPERIAL_CITY } from "../next-boss-constants/next-boss-constants.module.code.ts"
import { ICT } from "../next-boss-state/next-boss-state.module.code.ts"

export function initUi(this: void): undefined {
  ICT.ui = {
    opened: false,
    mapid: 0,
    timetable: ZO_SimpleSceneFragment.New(ICTTimeTable),
    maptimers: ZO_SimpleSceneFragment.New(ICTMapTimers),
    districts: {
      [GetString(SI_ICTHENEXTBOSS_MEMORIALDISTRICT)]: ICTMemorialDistrictLabel,
      [GetString(SI_ICTHENEXTBOSS_ARENADISTRICT)]: ICTArenaDistrictLabel,
      [GetString(SI_ICTHENEXTBOSS_ARBORETUMDISTRICT)]: ICTArboretumDistrictLabel,
      [GetString(SI_ICTHENEXTBOSS_TEMPLEDISTRICT)]: ICTTempleDistrictLabel,
      [GetString(SI_ICTHENEXTBOSS_NOBLESDISTRICT)]: ICTNoblesDistrictLabel,
      [GetString(SI_ICTHENEXTBOSS_ELVENGARDENSDISTRICT)]: ICTElvenGardensDistrictLabel,
      [GetString(SI_ICTHENEXTBOSS_CAN)]: ICTCanLabel,
    },
  }
  return undefined
}

ICT.disableMapMouseWheelZoom = function (this: void): undefined {
  function disableZoom(
    this: void,
    _self: unknown,
    _delta: unknown,
    force: unknown
  ): boolean | undefined {
    if (force !== undefined) {
      return false
    }
    if (
      ICT.running === true &&
      ICT.savedVariables.maptimers === true &&
      ICT.ui.mapid === MAP_ID_IMPERIAL_CITY
    ) {
      ZO_WorldMapZoom_OnMouseWheel(-1000, undefined, true)
      return true
    }
    return undefined
  }

  ZO_PreHook("ZO_WorldMap_MouseWheel", disableZoom)
  ZO_PreHook("ZO_WorldMapZoom_OnMouseWheel", disableZoom)
  ZO_PreHook("ZO_WorldMapZoomMinus_OnClicked", disableZoom)
  ZO_PreHook("ZO_WorldMapZoomPlus_OnClicked", disableZoom)
  return undefined
}

ICT.disableMapZoomSlider = function (this: void, disabled: boolean): undefined {
  const enabled = !disabled
  ZO_WorldMapZoomSliderButton1.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton2.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton3.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton4.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton5.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton6.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton7.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton8.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton9.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton10.SetEnabled(enabled)
  ZO_WorldMapZoomSliderButton11.SetEnabled(enabled)
  ZO_WorldMapZoomMinus.SetEnabled(enabled)
  ZO_WorldMapZoomPlus.SetEnabled(enabled)
  return undefined
}

ICT.onMapOpen = function (this: void): undefined {
  function check(this: void): undefined {
    if (
      ICT.running === true &&
      ICT.ui.opened === true &&
      ICT.savedVariables.maptimers === true &&
      ICT.ui.mapid === MAP_ID_IMPERIAL_CITY
    ) {
      ICTMapTimers.SetHidden(false)
      ICT.disableMapZoomSlider(true)
    } else {
      ICTMapTimers.SetHidden(true)
      ICT.disableMapZoomSlider(false)
    }
    return undefined
  }

  WORLD_MAP_SCENE.RegisterCallback(
    "StateChange",
    (_oldState: never, newState: never): undefined => {
      ICT.ui.mapid = GetCurrentMapId()
      ICT.ui.opened = newState === SCENE_SHOWN || newState === SCENE_SHOWING
      check()
      return undefined
    }
  )

  CALLBACK_MANAGER.RegisterCallback("OnWorldMapChanged", (): undefined => {
    ICT.ui.mapid = GetCurrentMapId()
    check()
    return undefined
  })
  return undefined
}

ICT.onTableMove = function (this: void): undefined {
  ICT.savedVariables.timetableTop = ICTTimeTable.GetTop()
  ICT.savedVariables.timetableLeft = ICTTimeTable.GetLeft()
  return undefined
}

ICT.restoreUiPosition = function (this: void): undefined {
  ICTTimeTable.ClearAnchors()
  ICTTimeTable.SetAnchor(
    TOPLEFT,
    GuiRoot,
    TOPLEFT,
    ICT.savedVariables.timetableLeft,
    ICT.savedVariables.timetableTop
  )
  return undefined
}
