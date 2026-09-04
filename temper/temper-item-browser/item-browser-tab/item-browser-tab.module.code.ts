import {
  ADDON_NAME,
  SLASH_COMMANDS_LIST,
  TAB_NAME,
} from "../item-browser-constants/item-browser-constants.module.code.ts"
import { createItemBrowserList } from "../item-browser-list/item-browser-list.module.code.ts"
import { registerCollectionCallbacks } from "../item-browser-multi-account/item-browser-multi-account.module.code.ts"
import {
  getAlwaysRefreshOnShow,
  getDirtiness,
  getInitialized,
  setDirtiness,
  setInitialized,
} from "../item-browser-refresh-state/item-browser-refresh-state.module.code.ts"
import {
  getList,
  getSettingsPanel,
  getVars,
  setAllianceStyle,
  setColors,
  setList,
  setMultiStyle,
} from "../item-browser-state/item-browser-state.module.code.ts"
import type { ContextMenuFactory } from "../item-browser-types/item-browser-types.module.code.ts"

const CONTEXT_MENU_ITEMS: ContextMenuFactory[] = []

export function registerContextMenuItem(this: void, factory: ContextMenuFactory): undefined {
  CONTEXT_MENU_ITEMS.push(factory)
  return undefined
}

registerContextMenuItem((data) => {
  return $multi(SI_ITEM_ACTION_LINK_TO_CHAT, () => {
    const [link] = string.gsub(data.itemLink, ":0(:0:%d+:0|h|h)$", ":1%1", 1)
    ZO_LinkHandler_InsertLink(link)
  })
})

registerContextMenuItem((data) => {
  const setId = data.setId
  let label: number
  let mode: boolean | undefined
  if (getVars().favorites[setId] !== true) {
    label = SI_COLLECTIBLE_ACTION_ADD_FAVORITE
    mode = true
  } else {
    label = SI_COLLECTIBLE_ACTION_REMOVE_FAVORITE
    mode = undefined
  }
  return $multi(label, () => {
    getVars().favorites[setId] = mode
    getList()?.RefreshFilters()
  })
})

registerContextMenuItem((data) => {
  return $multi("ID", data.setId)
})

export function initializeBrowser(this: void): undefined {
  LibExtendedJournal.RegisterTab(TAB_NAME, {
    title: SI_ITEMBROWSER_TITLE,
    order: 200,
    iconPrefix: "/esoui/art/collections/collections_tabicon_itemsets_",
    control: ItemBrowserFrame,
    settingsPanel: getSettingsPanel(),
    binding: "ITEMBROWSER",
    slashCommands: SLASH_COMMANDS_LIST,
    callbackShow: () => {
      lazyInitializeBrowser()
      refreshBrowser(true)
    },
  })
  return undefined
}

function lazyInitializeBrowser(this: void): undefined {
  if (getInitialized() !== 0) {
    return
  }
  setInitialized(1)

  const [hr, hg, hb, ha] = GetInterfaceColor(
    INTERFACE_COLOR_TYPE_POWER,
    COMBAT_MECHANIC_FLAGS_HEALTH
  )
  const [mr, mg, mb, ma] = GetInterfaceColor(
    INTERFACE_COLOR_TYPE_POWER,
    COMBAT_MECHANIC_FLAGS_MAGICKA
  )
  const [sr, sg, sb, sa] = GetInterfaceColor(
    INTERFACE_COLOR_TYPE_POWER,
    COMBAT_MECHANIC_FLAGS_STAMINA
  )
  setColors({
    health: ZO_ColorDef.New(hr, hg, hb, ha),
    magicka: ZO_ColorDef.New(mr, mg, mb, ma),
    stamina: ZO_ColorDef.New(sr, sg, sb, sa),
    violet: GetItemQualityColor(ITEM_DISPLAY_QUALITY_ARTIFACT),
    gold: GetItemQualityColor(ITEM_DISPLAY_QUALITY_LEGENDARY),
    mythic: GetItemQualityColor(ITEM_DISPLAY_QUALITY_MYTHIC_OVERRIDE),
    brown: ZO_ColorDef.New("885533"),
    teal: ZO_ColorDef.New("66CCCC"),
    pink: ZO_ColorDef.New("FF99CC"),
  })

  const allianceStyles: { [alliance: number]: number | undefined } = {
    [ALLIANCE_NONE]: 0,
    [ALLIANCE_ALDMERI_DOMINION]: 25,
    [ALLIANCE_EBONHEART_PACT]: 24,
    [ALLIANCE_DAGGERFALL_COVENANT]: 23,
  }
  setAllianceStyle(allianceStyles[GetUnitAlliance("player")] ?? 0)

  let multiStyle = GetUnitRaceId("player")
  if (multiStyle === 10) {
    multiStyle = 34
  }
  setMultiStyle(multiStyle)

  setList(createItemBrowserList(ItemBrowserFrame, CONTEXT_MENU_ITEMS))

  registerCollectionCallbacks(refreshCollections)

  LibCodesCommonCode.MonitorZoneChanges(ADDON_NAME, () => {
    if (getDirtiness() === 0) {
      setDirtiness(1)
    }
    refreshBrowser()
  })

  setInitialized(2)
  return undefined
}

export function refreshBrowser(this: void, noActiveCheck?: boolean): undefined {
  const list = getList()
  if (
    getInitialized() > 1 &&
    (getDirtiness() > 0 || getAlwaysRefreshOnShow()) &&
    (noActiveCheck === true || LibExtendedJournal.IsTabActive(TAB_NAME)) &&
    list !== undefined
  ) {
    if (getDirtiness() === 1 || (getDirtiness() === 0 && getAlwaysRefreshOnShow())) {
      list.RefreshFilters()
    } else {
      list.RefreshCollectionCount()
    }
    setDirtiness(0)
  }
  return undefined
}

export function refreshCollections(this: void): undefined {
  setDirtiness(2)
  refreshBrowser()
  return undefined
}
